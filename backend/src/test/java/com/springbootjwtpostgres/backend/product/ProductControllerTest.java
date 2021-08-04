package com.springbootjwtpostgres.backend.product;

import com.springbootjwtpostgres.backend.BackendApplication;
import com.springbootjwtpostgres.backend.TestHelper;
import com.springbootjwtpostgres.backend.inventory.Inventory;
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
class ProductControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepo productRepo;
    private String baseUrl = "/api/products";
    private Product product;

    @BeforeEach
    public void setup() {
        // given
        Inventory inventory = new Inventory();
        inventory.setCurrentQuantity(23L);
        Product product = new Product();
        product.setProductCode("FP");
        product.setProductName("first product");
        product.setInventory(inventory);
        this.product = this.productService.create(product);

        Inventory inventory2 = new Inventory();
        inventory2.setCurrentQuantity(24L);
        Product product2 = new Product();
        product2.setProductCode("SP");
        product2.setProductName("second product");
        product2.setInventory(inventory2);
        this.productService.create(product2);
    }

    @Test
    public void shouldGetAll() throws Exception {
        // when
        this.mockMvc
                .perform(get(this.baseUrl))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(2))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].productName").value("first product"));
    }

    @Test
    public void shouldGetOne() throws Exception {
        // when
        this.mockMvc
                .perform(get(this.baseUrl + "/1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.productName")
                        .value("first product")
                );
    }

    @Test
    public void shouldCreate() throws Exception {
        // given
        Inventory inventory = new Inventory();
        inventory.setCurrentQuantity(23L);
        Product original = new Product();
        original.setProductCode("SP");
        original.setProductName("second product");
        original.setInventory(inventory);

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
        this.product.setProductName("something else");

        // when
        this.mockMvc
                .perform(put(this.baseUrl + "/" + this.product.getId())
                        .content(TestHelper.asJsonString(this.product))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.productName").value("something else"));
    }

    @Test
    public void shouldDelete() throws Exception {
        this.mockMvc
                .perform(delete(this.baseUrl + "/" + this.product.getId()))
                .andExpect(status().isAccepted());
    }
}
