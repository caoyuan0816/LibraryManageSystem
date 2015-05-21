package hello.view;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;
import java.io.Writer;

/**
 * Created by yuan on 15/5/18.
 */
public class MyLogoutSuccessHandler implements LogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        HttpServletResponseWrapper responseWrapper = new HttpServletResponseWrapper(response);
        Writer out = responseWrapper.getWriter();
        out.write("{'status' : 'true', 'errors' : 'Logout success!'}");
        out.close();
    }
}
