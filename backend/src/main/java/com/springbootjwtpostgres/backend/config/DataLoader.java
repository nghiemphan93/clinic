package com.springbootjwtpostgres.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.springbootjwtpostgres.backend.bill.Bill;
import com.springbootjwtpostgres.backend.bill.BillRepo;
import com.springbootjwtpostgres.backend.bill.BillService;
import com.springbootjwtpostgres.backend.inventory.Inventory;
import com.springbootjwtpostgres.backend.inventory.InventoryRepo;
import com.springbootjwtpostgres.backend.order.*;
import com.springbootjwtpostgres.backend.orderdetail.OrderDetail;
import com.springbootjwtpostgres.backend.orderdetail.OrderDetailRepo;
import com.springbootjwtpostgres.backend.orderdetail.OrderDetailService;
import com.springbootjwtpostgres.backend.product.Product;
import com.springbootjwtpostgres.backend.product.ProductRepo;
import com.springbootjwtpostgres.backend.product.ProductService;
import com.springbootjwtpostgres.backend.user.ERole;
import com.springbootjwtpostgres.backend.user.Role;
import com.springbootjwtpostgres.backend.user.RoleRepository;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

class RandomDate {
    private final LocalDate minDate;
    private final LocalDate maxDate;
    private final Random random;

    public RandomDate(LocalDate minDate, LocalDate maxDate) {
        this.minDate = minDate;
        this.maxDate = maxDate;
        this.random = new Random();
    }

    public Date nextDate() {
        int minDay = (int) minDate.toEpochDay();
        int maxDay = (int) maxDate.toEpochDay();
        long randomDay = minDay + random.nextInt(maxDay - minDay);

        int second = random.nextInt(60);
        int minute = random.nextInt(60);
        int hour = random.nextInt(24);

        return Date.from(LocalDate.ofEpochDay(randomDay).atTime(hour, minute, second).toLocalDate().atStartOfDay(ZoneId.systemDefault()).toInstant());
    }

    @Override
    public String toString() {
        return "RandomDate{" +
                "maxDate=" + maxDate +
                ", minDate=" + minDate +
                '}';
    }
}

@Component
@AllArgsConstructor
public class DataLoader implements ApplicationRunner {
    private final RoleRepository roleRepository;
    private final ProductRepo productRepo;
    private final InventoryRepo inventoryRepo;
    private final OrderRepo orderRepo;
    private final OrderDetailRepo orderDetailRepo;
    private final BillRepo billRepo;
    private final OrderService orderService;
    private final OrderDetailService orderDetailService;
    private final BillService billService;
    private final ProductService productService;

    private final int MAX_ORDER = 100;
    private final int MAX_ORDERDETAIL = 15;
    private final int MAX_QUANTITY = 300;
    private final int MIN_QUANTITY = 30;

    private static final Logger logger = LoggerFactory.getLogger(DataLoader.class);

    @Override
    public void run(ApplicationArguments args) throws Exception {
        this.createRoles();
        this.createProducts();
        this.createOrders();
    }

    private void createOrders() throws NotFoundException {
        if (this.orderRepo.findAll().isEmpty()) {
            for (int i = 0; i < this.MAX_ORDER; i++) {
                Order order = this.createOrder();
                this.createBill(order);
            }
        }
        logger.info("created orders...");
        logger.info("created bills...");
    }

    private Order createOrder() throws NotFoundException {
        Order order = new Order();
        List<OrderStatus> orderStatuses = Arrays.asList(OrderStatus.PENDING, OrderStatus.PAID);
        List<OrderType> orderTypes = Arrays.asList(OrderType.BUY, OrderType.SELL);

        order.setCreatedAt(this.createOrderDate());
        order.setOrderTotalPrice(0);
        order.setOrderStatus(orderStatuses.get(this.randomInRange(0, 1)));
        order.setOrderType(orderTypes.get(this.randomInRange(0, 1)));

        order = this.orderService.create(order);
        List<OrderDetail> orderDetails = this.createOrderDetails(order);

        order.setOrderTotalPrice(this.orderService.calOrderTotalPrice(orderDetails));
        return this.orderService.update(order.getId(), order);
    }

    private void createBill(Order order) {
        Bill bill = new Bill();
        bill.setCreatedAt(order.getCreatedAt());
        bill.setBillTotalPrice(order.getOrderTotalPrice());
        bill.setBillStatus(order.getOrderStatus());
        bill.setBillType(order.getOrderType());
        bill.setOrder(order);
        bill.setOrderId(order.getId());

        this.billService.create(bill);
    }

    private List<OrderDetail> createOrderDetails(Order order) {
        List<Product> products = this.productRepo.findAll();
        List<OrderDetail> orderDetails = new ArrayList<>();

        for (int i = 0; i < this.MAX_ORDERDETAIL; i++) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setOrder(order);
            orderDetail.setOrderId(order.getId());
            orderDetail.setProduct(products.get(this.randomInRange(0, products.size() - 1)));
            orderDetail.setProductId(orderDetail.getProduct().getId());
            orderDetail.setCreatedAt(new Date());
            orderDetail.setQuantity(this.randomInRange(this.MIN_QUANTITY, this.MAX_QUANTITY));
            orderDetail.setTotalPricePerProduct(this.orderDetailService.calTotalPricePerProduct(order, orderDetail));

            orderDetails.add(orderDetail);
        }
        logger.info("created order details for order " + order.getId());
        return this.orderDetailRepo.saveAll(orderDetails);
    }

    private Date createOrderDate() {
        LocalDate minDay = LocalDate.of(2019, 1, 1);
        LocalDate maxDay = LocalDate.of(2021, 1, 1);
        return new RandomDate(minDay, maxDay).nextDate();
    }

    private int randomInRange(int from, int to) {
        return ThreadLocalRandom.current().nextInt(from, to + 1);
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
                    Long randomQuantity = ThreadLocalRandom.current().nextLong(50, 500 + 1);
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
