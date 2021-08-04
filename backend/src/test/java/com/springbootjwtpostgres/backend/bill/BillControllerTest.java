package com.springbootjwtpostgres.backend.bill;

import com.springbootjwtpostgres.backend.BackendApplication;
import com.springbootjwtpostgres.backend.TestHelper;
import com.springbootjwtpostgres.backend.inventory.Inventory;
import com.springbootjwtpostgres.backend.order.Order;
import com.springbootjwtpostgres.backend.order.OrderService;
import com.springbootjwtpostgres.backend.order.OrderStatus;
import com.springbootjwtpostgres.backend.product.Product;
import com.springbootjwtpostgres.backend.product.ProductService;
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
class BillControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private BillService billService;
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderService orderService;
    private String baseUrl = "/api/bills";
    private Bill bill;
    private Product product;
    private Order order;

    @BeforeEach
    public void setup() throws NotFoundException {
        // given
        Inventory inventory = new Inventory();
        inventory.setCurrentQuantity(23L);
        Product product = new Product();
        product.setProductCode("FP");
        product.setProductName("first product");
        product.setInventory(inventory);
        this.product = this.productService.create(product);

        Order order = new Order();
        order.setOrderStatus(OrderStatus.PENDING);
        this.order = this.orderService.create(order);

        Bill bill = new Bill();
        bill.setBillTotalPrice(10);
        bill.setOrder(order);
        bill.setOrderId(order.getId());
        this.bill = (Bill) this.billService.create(bill);
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
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].billTotalPrice").value(10));
    }

    @Test
    public void shouldGetOne() throws Exception {
        // when
        this.mockMvc
                .perform(get(this.baseUrl + "/" + this.bill.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.billTotalPrice")
                        .value(10)
                );
    }

    @Test
    public void shouldCreate() throws Exception {
        // when
        this.mockMvc
                .perform(post(this.baseUrl)
                        .content(TestHelper.asJsonString(this.bill))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void shouldUpdate() throws Exception {
        // given
        this.bill.setBillTotalPrice(20);

        // when
        this.mockMvc
                .perform(put(this.baseUrl + "/" + this.bill.getId())
                        .content(TestHelper.asJsonString(this.bill))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.billTotalPrice").value(20));
    }

    @Test
    public void shouldDelete() throws Exception {
        this.mockMvc
                .perform(delete(this.baseUrl + "/" + this.bill.getId()))
                .andExpect(status().isAccepted());
    }
}
