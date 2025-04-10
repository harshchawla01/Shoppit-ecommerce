//package com.shoppit.ecommerce.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.lang.NonNull;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.security.oauth2.jwt.JwtClaimNames;
//import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
//import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
//import org.springframework.stereotype.Component;
//
//import java.util.Collection;
//import java.util.Map;
//import java.util.Set;
//import java.util.stream.Collectors;
//import java.util.stream.Stream;
//
//@Component
//public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {
//
//    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
//
//    @Value("${jwt.auth.converter.principal_attribute}")
//    private String principalAttribute;
//
//    @Value("${jwt.auth.converter.resource_id}") // client_id
//    private String resourceId;
//
//    @Override
//    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
//        Collection<GrantedAuthority> authorities = Stream.concat(
//                        jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
//                        extractResourceRoles(jwt).stream()
//                )
//                .collect(Collectors.toSet());
//        return new JwtAuthenticationToken(jwt, authorities, getPrincipalClaimName(jwt));
//    }
//
//    private String getPrincipalClaimName(Jwt jwt) {
////        The subject of the JWT (the user).
//        String claimName = JwtClaimNames.SUB; // Just in case preferred name is not available
//        if(principalAttribute != null) {
//            claimName = principalAttribute;
//        }
////        String claimValue = jwt.getClaim(claimName);
//        return jwt.getClaim(claimName);
//    }
//
//    private Collection<? extends GrantedAuthority> extractResourceRoles(Jwt jwt) {
//        Map<String, Object> resourceAccess;
//        Map<String, Object> resource; // client_id
//        Collection<String> resourceRoles;
//
//        if(jwt.getClaim("resource_access") == null) {
//            return Set.of();
//        }
//        resourceAccess = jwt.getClaim("resource_access");
//        if(resourceAccess.get(resourceId) == null) {
//            return Set.of();
//        }
//        resource = (Map<String, Object>) resourceAccess.get(resourceId);
//        resourceRoles = (Collection<String>) resource.get("roles");
//        return resourceRoles
//                .stream()
//                .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // This SimpleGrantedAuthority extends the GrantedAuthority
//                .collect(Collectors.toSet()); // Used set so that it made sure that if a user has any role assigned, it is present only once in its collection
//    }
//}

package com.shoppit.ecommerce.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    @Value("${jwt.auth.converter.principal_attribute}")
    private String principalAttribute;

    @Value("${jwt.auth.converter.resource_id}") // client_id
    private String resourceId;

    @Override
    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
        Collection<GrantedAuthority> authorities = Stream.concat(
                        jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
                        extractRoles(jwt).stream()
                )
                .collect(Collectors.toSet());
        return new JwtAuthenticationToken(jwt, authorities, getPrincipalClaimName(jwt));
    }

    private String getPrincipalClaimName(Jwt jwt) {
        String claimName = JwtClaimNames.SUB;
        if (principalAttribute != null) {
            claimName = principalAttribute;
        }
        return jwt.getClaim(claimName);
    }

    private Collection<? extends GrantedAuthority> extractRoles(Jwt jwt) {
        Set<GrantedAuthority> authorities = new HashSet<>();

        // Extract realm roles
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            Collection<String> realmRoles = (Collection<String>) realmAccess.get("roles");
            realmRoles.forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
        }

        // Extract resource roles - specifically from the resourceId (which should be "shoppit-ecommerce")
        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
        if (resourceAccess != null && resourceAccess.get(resourceId) instanceof Map) {
            Map<String, Object> resource = (Map<String, Object>) resourceAccess.get(resourceId);
            if (resource.get("roles") instanceof Collection) {
                Collection<String> resourceRoles = (Collection<String>) resource.get("roles");
                resourceRoles.forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
            }
        }

        return authorities;
    }
}

//    private Collection<? extends GrantedAuthority> extractRoles(Jwt jwt) {
//        Set<GrantedAuthority> authorities = new HashSet<>();
//
//        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
//        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
//
//        Collection<String> allRoles = new ArrayList<>();
//        Collection<String> resourceRoles;
//        Collection<String> realmRoles;
//
//
////        if (resourceAccess != null && resourceAccess.get(resourceId) instanceof Map) {
////            Map<String, Object> resource = (Map<String, Object>) resourceAccess.get(resourceId);
////            if (resource.get("roles") instanceof Collection) {
////                Collection<String> resourceRoles = (Collection<String>) resource.get("roles");
////                resourceRoles.forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
////            }
////        }
//
//        if(resourceAccess != null && resourceAccess.get("account") != null){
//            Map<String,Object> account =  (Map<String,Object>) resourceAccess.get("account");
//            if(account.containsKey("roles") ){
//                resourceRoles = (Collection<String>) account.get("roles");
//                allRoles.addAll(resourceRoles);
//            }
//        }
//
//
////        if (realmAccess != null && realmAccess.get("roles") instanceof Collection) {
////            Collection<String> realmRoles = (Collection<String>) realmAccess.get("roles");
////            realmRoles.forEach(role -> authorities.add(new SimpleGrantedAuthority("ROLE_" + role)));
////        }
//
//        if(realmAccess != null && realmAccess.containsKey("roles")){
//            realmRoles = (Collection<String>) realmAccess.get("roles");
//            allRoles.addAll(realmRoles);
//        }
//
//        if (allRoles.isEmpty() || !Objects.equals(resourceId,jwt.getClaim("azp")) ) {
//
//            return Set.of();
//        }
//
//        return allRoles.stream()
//                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
//                .collect(Collectors.toSet());
//
////        return authorities;
//    }
//}

//package com.shoppit.ecommerce.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.core.convert.converter.Converter;
//import org.springframework.lang.NonNull;
//import org.springframework.security.authentication.AbstractAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.security.oauth2.jwt.JwtClaimNames;
//import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
//import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
//import org.springframework.stereotype.Component;
//
//import java.util.*;
//import java.util.stream.Collectors;
//import java.util.stream.Stream;
//
//@Component
//public class JwtAuthConverter implements Converter<Jwt, AbstractAuthenticationToken> {
//
//    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
//
//    @Value("${jwt.auth.converter.principal_attribute}")
//    private String principalAttribute;
//
//    @Value("${jwt.auth.converter.resource_id}")
//    private String resourceId;
//
//    @Override
//    public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
//        Collection<GrantedAuthority> authorities = Stream.concat(
//                        jwtGrantedAuthoritiesConverter.convert(jwt).stream(),
//                        extractRoles(jwt).stream()
//                )
//                .collect(Collectors.toSet());
//        return new JwtAuthenticationToken(jwt, authorities, getPrincipalClaimName(jwt));
//    }
//
//    private String getPrincipalClaimName(Jwt jwt) {
//        String claimName = JwtClaimNames.SUB;
//        if (principalAttribute != null) {
//            claimName = principalAttribute;
//        }
//        return jwt.getClaim(claimName);
//    }
//
//    private Collection<? extends GrantedAuthority> extractRoles(Jwt jwt) {
//        Set<GrantedAuthority> authorities = new HashSet<>();
//
//        // Extract realm roles
//        Map<String, Object> realmAccess = jwt.getClaim("realm_access");
//        if (realmAccess != null && realmAccess.containsKey("roles")) {
//            Collection<String> realmRoles = (Collection<String>) realmAccess.get("roles");
//            // Don't prepend ROLE_ since hasRole() will do it automatically
//            realmRoles.forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
//        }
//
//        // Extract resource roles - specifically from the resourceId
//        Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
//        if (resourceAccess != null && resourceAccess.get(resourceId) instanceof Map) {
//            Map<String, Object> resource = (Map<String, Object>) resourceAccess.get(resourceId);
//            if (resource.get("roles") instanceof Collection) {
//                Collection<String> resourceRoles = (Collection<String>) resource.get("roles");
//                // Don't prepend ROLE_ since hasRole() will do it automatically
//                resourceRoles.forEach(role -> authorities.add(new SimpleGrantedAuthority(role)));
//            }
//        }
//
//        return authorities;
//    }
//}