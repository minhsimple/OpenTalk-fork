package ncc.java.opentalk.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CompanyBranchIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Test
    void testGetCompanyBranches() throws Exception {
        MvcResult mvcResult = mockMvc.perform(get("http://localhost:8080/api/company-branch")).andReturn();
        mvcResult.getResponse().getContentAsString();
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.length()").value(1))
//                .andReturn();
    }
}
