package com.shoppit.ecommerce.api.keycloak;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.ClientResource;
import org.keycloak.admin.client.resource.RolesResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.client-id}") // Inject client ID from config
    private String clientId;

    @Value("${keycloak.client-uuid}")
    private String clientUuid;

    @Autowired
    private Keycloak keycloak;

    @Autowired
    private KeycloakUserService keycloakUserService;

    @Override
    public void assignRole(String userId, String roleName, boolean isClientRole) {
        UserResource userResource = keycloakUserService.getUserResource(userId);

        if (isClientRole) {
            assignClientRole(userResource, roleName);
        } else {
            assignRealmRole(userResource, roleName);
        }
    }

    private void assignRealmRole(UserResource userResource, String roleName) {
        RolesResource rolesResource = keycloak.realm(realm).roles();
        RoleRepresentation roleRepresentation = rolesResource.get(roleName).toRepresentation();
        userResource.roles().realmLevel().add(Collections.singletonList(roleRepresentation));
    }

    private void assignClientRole(UserResource userResource, String roleName) {
//        String clientUUID = getClientUUID();
        ClientResource clientResource = keycloak.realm(realm).clients().get(clientUuid);

        RoleRepresentation roleRepresentation = clientResource.roles().get(roleName).toRepresentation();
        userResource.roles().clientLevel(clientUuid).add(Collections.singletonList(roleRepresentation));
    }

    public List<RoleRepresentation> getClientRoles() {
//        String clientUUID = getClientUUID();
        return keycloak.realm(realm).clients().get(clientUuid).roles().list();
    }
}
