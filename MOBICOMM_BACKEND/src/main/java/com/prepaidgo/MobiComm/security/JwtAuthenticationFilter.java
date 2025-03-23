package com.prepaidgo.MobiComm.security;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.prepaidgo.MobiComm.entity.Users;
import com.prepaidgo.MobiComm.repository.RevokedTokenRepository;
import com.prepaidgo.MobiComm.repository.UsersRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private RevokedTokenRepository revokedTokenRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		String token = request.getHeader("Authorization");

		if (token != null && token.startsWith("Bearer ")) {
			token = token.substring(7); 
			
			if (jwtUtil.isTokenExpired(token)) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.getWriter().write("Invalid or expired token.");
				return;
			}

			if (revokedTokenRepository.findById(token).isPresent()) {
				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.getWriter().write("Token has been revoked.");
				return;
			}

			String identity = jwtUtil.extractIdentifier(token);
			String role = jwtUtil.extractRole(token);

			Optional<Users> user = null;
			if (role.equals("ADMIN")) {
				user = usersRepository.findByUsername(identity);
			}
			else {
				if(role.equals("SUBSCRIBER")) {
					user = usersRepository.findByPhoneNumber(identity);
				}
			}
			

			if (user.isPresent()) {
				List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority(role));

				SecurityContextHolder.getContext()
						.setAuthentication(new UsernamePasswordAuthenticationToken(identity , null, authorities));

				System.out.println("Authorities: " + authorities);
			}
		}

		chain.doFilter(request, response);
	}
}

