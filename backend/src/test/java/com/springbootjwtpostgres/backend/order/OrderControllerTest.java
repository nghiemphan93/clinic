package com.springbootjwtpostgres.backend.order;

import com.springbootjwtpostgres.backend.BackendApplication;
import com.springbootjwtpostgres.backend.TestHelper;
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
class OrderControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepo orderRepo;
    private String baseUrl = "/api/orders";
    private Order order;

    @BeforeEach
    public void setup() {
        // given
        Order order1 = new Order();
        order1.setOrderStatus(OrderStatus.PENDING);
        this.order = this.orderService.create(order1);

        Order order2 = new Order();
        order2.setOrderStatus(OrderStatus.PAID);
        this.orderService.create(order2);
    }

    @Test
    public void shouldGetAll() throws Exception {
        // when -> then
        this.mockMvc
                .perform(get(this.baseUrl))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].orderStatus").value(OrderStatus.PENDING.toString()));
    }

    @Test
    public void shouldGetOne() throws Exception {
        // when
        this.mockMvc
                .perform(get(this.baseUrl + "/" + this.order.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.orderStatus")
                        .value(OrderStatus.PENDING.toString())
                );
    }

    @Test
    public void shouldCreate() throws Exception {
        // given
        Order original = new Order();
        original.setOrderStatus(OrderStatus.PENDING);
        original.setId(1L);

        // when
        this.mockMvc
                .perform(post(this.baseUrl)
                        .content(TestHelper.asJsonString(original))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void shouldUpdate() throws Exception {
        // given
        this.order.setOrderStatus(OrderStatus.PAID);

        // when
        this.mockMvc
                .perform(put(this.baseUrl + "/" + this.order.getId())
                        .content(TestHelper.asJsonString(this.order))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.orderStatus").value(OrderStatus.PAID.toString()));
    }

    @Test
    public void shouldDelete() throws Exception {
        this.mockMvc
                .perform(delete(this.baseUrl + "/" + this.order.getId()))
                .andExpect(status().isAccepted());
    }

    @Test
    public void shouldGetOnePdf() throws Exception {
        this.mockMvc
                .perform(get(this.baseUrl + "/" + this.order.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}
