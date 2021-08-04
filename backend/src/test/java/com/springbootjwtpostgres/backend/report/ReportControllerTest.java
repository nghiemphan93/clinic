package com.springbootjwtpostgres.backend.report;

import com.springbootjwtpostgres.backend.BackendApplication;
import com.springbootjwtpostgres.backend.TestHelper;
import javassist.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = BackendApplication.class)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class ReportControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ReportService reportService;
    private String baseUrl = "/api/reports";
    private Report report;

    @BeforeEach
    public void setup() throws NotFoundException {
        // given
        Report report = new Report();
        report.setBeforeQuantity(10);
        this.report = (Report) this.reportService.create(report);
    }

    @Test
    public void shouldGetAll() throws Exception {
        // when -> then
        this.mockMvc
                .perform(get(this.baseUrl))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].beforeQuantity").value(10));
        ;
    }

    @Test
    public void shouldGetOne() throws Exception {
        // when
        this.mockMvc
                .perform(get(this.baseUrl + "/" + this.report.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.beforeQuantity")
                        .value(10)
                );
    }

    @Test
    public void shouldCreate() throws Exception {
        // when
        this.mockMvc
                .perform(post(this.baseUrl)
                        .content(TestHelper.asJsonString(this.report))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void shouldUpdate() throws Exception {
        // given
        this.report.setBeforeQuantity(20);
        // when
        this.mockMvc
                .perform(put(this.baseUrl + "/" + this.report.getId())
                        .content(TestHelper.asJsonString(this.report))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.beforeQuantity").value(20));
    }

    @Test
    public void shouldDelete() throws Exception {
        this.mockMvc
                .perform(delete(this.baseUrl + "/" + this.report.getId()))
                .andExpect(status().isAccepted());
    }
}
