package com.shoppit.ecommerce.api.keycloak;

import com.shoppit.ecommerce.request.SignupRequest;
import jakarta.ws.rs.core.Response;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Slf4j
public class KeycloakUserServiceImpl implements KeycloakUserService {

    @Autowired
    private Keycloak keycloak;

    @Value("${keycloak.realm}")
    private String realm;

    public KeycloakUserServiceImpl(Keycloak keycloak) {
        this.keycloak = keycloak;
    }

    @Override
    public ResponseEntity<?> createUser(SignupRequest req) {
        UserRepresentation user=new UserRepresentation();
        user.setEnabled(true);
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());
        user.setEmailVerified(true);

        CredentialRepresentation credentialRepresentation=new CredentialRepresentation();
        credentialRepresentation.setValue(req.getPassword());
        credentialRepresentation.setTemporary(false);
        credentialRepresentation.setType(CredentialRepresentation.PASSWORD);

        List<CredentialRepresentation> list = new ArrayList<>();
        list.add(credentialRepresentation);
        user.setCredentials(list);

        UsersResource usersResource = getUsersResource();

        Response response = usersResource.create(user);

        if(Objects.equals(201,response.getStatus())){

//            List<UserRepresentation> representationList = usersResource.searchByUsername(userRegistrationRecord.username(), true);
//            if(!CollectionUtils.isEmpty(representationList)){
//                UserRepresentation userRepresentation1 = representationList.stream().filter(userRepresentation -> Objects.equals(false, userRepresentation.isEmailVerified())).findFirst().orElse(null);
//                assert userRepresentation1 != null;
//                emailVerification(userRepresentation1.getId());
//            }
            return ResponseEntity.status(201).body(user);
        } else {
            // Extract error details from response
            String responseBody = response.readEntity(String.class);
//            log.error("Failed to create user. Status: {}, Body: {}", response.getStatus(), responseBody);
            return ResponseEntity.status(response.getStatus()).body(responseBody);
        }

//        response.readEntity()

//        return ResponseEntity.status(400).body(response);

    }

    private UsersResource getUsersResource() {
        RealmResource realm1 = keycloak.realm(realm);
        return realm1.users();
    }

    @Override
    public UserRepresentation getUserById(String id) {
        return getUsersResource().get(id).toRepresentation();
    }

    @Override
    public void deleteUserById(String id) {
        getUsersResource().delete(id);
    }

    @Override
    public UserResource getUserResource(String userId) {
        UsersResource usersResource = getUsersResource();
        return usersResource.get(userId);
    }
}
