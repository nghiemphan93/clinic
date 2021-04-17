package com.springbootjwtpostgres.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootjwtpostgres.backend.inventory.Inventory;
import com.springbootjwtpostgres.backend.inventory.InventoryRepo;
import com.springbootjwtpostgres.backend.product.Product;
import com.springbootjwtpostgres.backend.product.ProductRepo;
import com.springbootjwtpostgres.backend.user.ERole;
import com.springbootjwtpostgres.backend.user.Role;
import com.springbootjwtpostgres.backend.user.RoleRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Component
public class DataLoader implements ApplicationRunner {
    private final RoleRepository roleRepository;
    private final ProductRepo productRepo;
    private final InventoryRepo inventoryRepo;
    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    public DataLoader(RoleRepository roleRepository, ProductRepo productRepo, InventoryRepo inventoryRepo) {
        this.roleRepository = roleRepository;
        this.productRepo = productRepo;
        this.inventoryRepo = inventoryRepo;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        this.createRoles();
        this.createProducts();
    }

    private void createProducts() throws IOException {
        try {
            if (this.productRepo.findAll().isEmpty()) {
                ObjectMapper objectMapper = new ObjectMapper();
                File file = new File("backend/src/main/resources/data/products.json");
                List<Product> products = Arrays.asList(objectMapper.readValue(file, Product[].class));

                products = products.stream().map(product -> {
                    Inventory toSaveInventory = new Inventory();
                    toSaveInventory.setCreatedAt(new Date());
                    Long randomQuantity = ThreadLocalRandom.current().nextLong(0, 500 + 1);
                    toSaveInventory.setCurrentQuantity(randomQuantity);

                    toSaveInventory = this.inventoryRepo.save(toSaveInventory);

                    Product toSaveProduct = new Product();
                    toSaveProduct.setCreatedAt(new Date());
                    toSaveProduct.setProductName(product.getProductName());
                    toSaveProduct.setProductCode(product.getProductCode());
                    toSaveProduct.setProductPriceIn(product.getProductPriceIn());
                    toSaveProduct.setProductPriceOut(product.getProductPriceOut());
                    toSaveProduct.setNote(product.getNote());
                    toSaveProduct.setInventory(toSaveInventory);

                    toSaveProduct = this.productRepo.save(toSaveProduct);
                    return toSaveProduct;
                }).collect(Collectors.toList());
                logger.info("created products...");
            }


        } catch (Exception e) {
            logger.error(e.getMessage());
        }

    }

    private void createRoles() {
        List<Role> roles = this.roleRepository.findAll();
        if (roles.isEmpty()) {
            Role admin = new Role();
            admin.setRole(ERole.ROLE_MANAGER);
            Role mod = new Role();
            mod.setRole(ERole.ROLE_DOCTOR);
            Role user = new Role();
            user.setRole(ERole.ROLE_NURSE);
            roles.add(admin);
            roles.add(mod);
            roles.add(user);
            this.roleRepository.saveAll(roles);
            logger.info("created roles...");
        }
    }
}
