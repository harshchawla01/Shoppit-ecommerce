package com.shoppit.ecommerce.api.keycloak;

import com.shoppit.ecommerce.request.SignupRequest;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.http.ResponseEntity;

public interface KeycloakUserService {

    ResponseEntity<?> createUser(SignupRequest req);

    UserRepresentation getUserById(String id);

    void deleteUserById(String id);

    public UserResource getUserResource(String userId);
}
