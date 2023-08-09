package com.stackroute.authenticationservice.filter;

import io.jsonwebtoken.Jwts;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JwtFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest=(HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse=(HttpServletResponse) servletResponse;

        ServletOutputStream servletOutputStream=httpServletResponse.getOutputStream();

        if(httpServletRequest.getMethod().equals("OPTIONS")){
            httpServletResponse.setStatus(httpServletResponse.SC_OK);
        }

        // expects the token to come from header
        String authHeader=httpServletRequest.getHeader("Authorization");
        if(authHeader==null||!authHeader.startsWith("Bearer")){
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            servletOutputStream.println("Token invalid or missing");
            servletOutputStream.close();
        }else{
            String jwtToken = authHeader.substring(7);//Bearer => 6+1 since token begins with Bearer

            String username = Jwts.parser().setSigningKey("secretkey").parseClaimsJws(jwtToken).getBody().getSubject();
            httpServletRequest.setAttribute("username", username);

            filterChain.doFilter(servletRequest, servletResponse);

        }

    }
}
