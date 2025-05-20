from kubernetes import config, client

def get_gateway_routes():
    config.load_kube_config()
    api = client.CustomObjectsApi()

    group = "gateway.networking.k8s.io"
    version = "v1"

    gateways = api.list_cluster_custom_object(group, version, "gateways")
    httproutes = api.list_cluster_custom_object(group, version, "httproutes")
    services = client.CoreV1Api().list_service_for_all_namespaces()

    diagram_data = []

    # Prima raccogliamo tutti i gateway
    gateway_map = {}
    for gw in gateways.get("items", []):
        gw_name = gw["metadata"]["name"]
        gw_namespace = gw["metadata"]["namespace"]
        key = f"{gw_namespace}/{gw_name}"
        gateway_map[key] = {
            "gateway": key,
            "hostnames": [l.get("hostname", "") for l in gw.get("spec", {}).get("listeners", [])],
            "routes": []
        }

    # Poi processiamo le routes
    for route in httproutes.get("items", []):
        route_namespace = route["metadata"]["namespace"]
        for parent_ref in route.get("spec", {}).get("parentRefs", []):
            parent_name = parent_ref.get("name")
            parent_namespace = parent_ref.get("namespace", route_namespace)
            gateway_key = f"{parent_namespace}/{parent_name}"

            if gateway_key in gateway_map:
                for rule in route.get("spec", {}).get("rules", []):
                    for backend in rule.get("backendRefs", []):
                        backend_name = backend.get('name')
                        backend_namespace = backend.get('namespace', route_namespace)
                        backend_port = backend.get('port', '80')

                        # Trova il service corrispondente
                        svc = next(
                            (s for s in services.items
                             if s.metadata.name == backend_name and
                             s.metadata.namespace == backend_namespace),
                            None
                        )

                        gateway_map[gateway_key]["routes"].append({
                            "name": route["metadata"]["name"],
                            "namespace": route_namespace,
                            "path": rule.get("matches", [{}])[0].get("path", {}).get("value", "/"),
                            "backend": f"{backend_namespace}/{backend_name}:{backend_port}"
                        })

    return list(gateway_map.values())