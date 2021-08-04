package com.springbootjwtpostgres.backend.inventory;

import com.springbootjwtpostgres.backend.BackendApplication;
import com.springbootjwtpostgres.backend.TestHelper;
import com.springbootjwtpostgres.backend.product.Product;
import com.springbootjwtpostgres.backend.product.ProductService;
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
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
@AutoConfigureMockMvc
class InventoryControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ProductService productService;
    private String baseUrl = "/api/products";
    private Inventory inventory;
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
        this.inventory = this.product.getInventory();

        Inventory inventory2 = new Inventory();
        inventory2.setCurrentQuantity(24L);
        Product product2 = new Product();
        product2.setProductCode("SP");
        product2.setProductName("second product");
        product2.setInventory(inventory2);
        this.productService.create(product2);
    }

    @Test
    public void shouldGetOne() throws Exception {
        // when
        this.mockMvc
                .perform(get(this.baseUrl + "/" + this.product.getId() + "/inventories/" + this.inventory.getId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.currentQuantity")
                        .value(23L)
                )
        ;
    }

    @Test
    public void shouldCreate() throws Exception {
        // given
        Inventory inventory = new Inventory();
        inventory.setCurrentQuantity(23L);

        // when
        this.mockMvc
                .perform(post(this.baseUrl + "/" + this.product.getId() + "/inventories")
                        .content(TestHelper.asJsonString(inventory))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated());
    }

    @Test
    public void shouldUpdate() throws Exception {
        // given
        this.inventory.setCurrentQuantity(123L);

        // when
        this.mockMvc
                .perform(put(this.baseUrl + "/" + this.product.getId() + "/inventories/" + this.inventory.getId())
                        .content(TestHelper.asJsonString(this.inventory))
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void shouldDelete() throws Exception {
        this.mockMvc
                .perform(delete(this.baseUrl + "/" + this.product.getId() + "/inventories/" + this.inventory.getId()));
//                .andExpect(status().isAccepted());
    }
}
