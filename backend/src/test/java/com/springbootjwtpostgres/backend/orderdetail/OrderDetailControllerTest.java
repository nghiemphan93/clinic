package com.springbootjwtpostgres.backend.orderdetail;

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
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = BackendApplication.class)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
class OrderDetailControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ProductService productService;
    @Autowired
    private OrderDetailService orderDetailService;
    private String baseUrl = "/api/orders";
    private OrderDetail orderDetail;
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
        product = this.productService.create(product);

        Order order = new Order();
        order.setOrderStatus(OrderStatus.PENDING);
        this.order = this.orderService.create(order);

        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setOrder(this.order);
        orderDetail.setOrderId(this.order.getId());
        orderDetail.setProduct(product);
        orderDetail.setProductId(product.getId());
        orderDetail.setQuantity(10);
        this.orderDetail = this.orderDetailService.create(orderDetail, order.getId());
    }

    @Test
    public void shouldGetAll() throws Exception {
        // when -> then
        this.mockMvc
                .perform(get(this.baseUrl + "/" + this.order.getId() + "/orderDetails"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(1))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].quantity").value(10));
        ;
    }

    @Test
    public void shouldGetOne() throws Exception {
        // when
        this.mockMvc
                .perform(get(this.baseUrl + "/" + this.order.getId() + "/orderDetails/" + this.orderDetail.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.quantity")
                        .value(10)
                );
    }

    @Test
    public void shouldCreate() throws Exception {
        // when
        this.mockMvc
                .perform(post(this.baseUrl)
                        .content(TestHelper.asJsonString(this.orderDetail))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void shouldUpdate() throws Exception {
        // given
        this.orderDetail.setQuantity(20);

        // when
        this.mockMvc
                .perform(put(this.baseUrl + "/" + this.order.getId() + "/orderDetails/" + this.orderDetail.getId())
                        .content(TestHelper.asJsonString(this.orderDetail))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON));
//                .andExpect(status().isOk());
//                .andExpect(MockMvcResultMatchers.jsonPath("$.quantity").value(20));
    }

    @Test
    public void shouldDelete() throws Exception {
        // when
        this.mockMvc
                .perform(delete(this.baseUrl + "/" + this.order.getId() + "/orderDetails/" + this.orderDetail.getId()))
                .andExpect(status().isAccepted());
    }
}
