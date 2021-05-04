package com.springbootjwtpostgres.backend.order;

import com.springbootjwtpostgres.backend.basemodels.BasePage;
import com.springbootjwtpostgres.backend.orderdetail.OrderDetail;
import com.springbootjwtpostgres.backend.orderdetail.OrderDetailRepo;
import javassist.NotFoundException;
import lombok.AllArgsConstructor;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;


@Service
@AllArgsConstructor
public class OrderService {
    private final OrderRepo repo;
    private final OrderCriteriaRepo criteriaRepo;
    private final OrderDetailRepo orderDetailRepo;

    public Page<Order> getAll(BasePage page, OrderSearchCriteria searchCriteria) {
        return this.criteriaRepo.findAllWithFilters(page, searchCriteria);
    }

    public Order getOne(Long id) throws NotFoundException {
        return this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Order.class.getSimpleName() + " not found"));
    }

    public Order create(Order newEntity) {
        newEntity.setOrderTotalPrice(0);
        newEntity.setCreatedAt(new Date());
        return this.repo.save(newEntity);
    }

    public Order update(Long id, Order updatedEntity) throws NotFoundException {
        Order oldEntity = this.repo.findById(id)
                .orElseThrow(() -> new NotFoundException(Order.class.getSimpleName() + " not found"));
        oldEntity.setOrderType(updatedEntity.getOrderType());
        oldEntity.setOrderStatus(updatedEntity.getOrderStatus());
        oldEntity.setOrderTotalPrice(updatedEntity.getOrderTotalPrice());
        return this.repo.save(oldEntity);
    }

    public void delete(Long id) {
        this.repo.deleteById(id);
    }

    public double calOrderTotalPrice(List<OrderDetail> orderDetails) {
        return orderDetails
                .stream()
                .mapToDouble(orderDetail -> orderDetail.getTotalPricePerProduct())
                .sum();
    }

    public byte[] getOnePdf(Long orderId) throws IOException, JRException {
        List<OrderDetail> orderDetails = this.orderDetailRepo.findAllByOrderId(orderId);
        List<Invoice> invoices = this.orderDetails2Invoices(orderDetails);

//        File file = ResourceUtils.getFile("classpath:pdfTemplates/Invoice.jrxml");
        InputStream file = new ClassPathResource("classpath:pdfTemplates/Invoice.jrxml").getInputStream();
        JasperReport jasperReport = JasperCompileManager.compileReport(file);

        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(invoices);
        JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, null, dataSource);
        return JasperExportManager.exportReportToPdf(jasperPrint);
    }

    private List<Invoice> orderDetails2Invoices(List<OrderDetail> orderDetails) {
        Double orderTotalPrice = this.calOrderTotalPrice(orderDetails);
        Long rowNumber = 1L;
        Iterator<OrderDetail> iterator = orderDetails.iterator();
        List<Invoice> invoices = new ArrayList<>();

        while (iterator.hasNext()) {
            OrderDetail orderDetail = iterator.next();
            Invoice invoice = new Invoice();
            invoice.setRow_number(rowNumber++);
            invoice.setOrder_id(orderDetail.getOrder().getId());
            invoice.setOrder_type(orderDetail.getOrder().getOrderType());
            invoice.setProduct_name(orderDetail.getProduct().getProductName());
            invoice.setProduct_code(orderDetail.getProduct().getProductCode());
            invoice.setQuantity(orderDetail.getQuantity());
            invoice.setPrice(orderDetail.getPrice());
            invoice.setTotal_price_per_product(orderDetail.getTotalPricePerProduct());
            invoice.setOrder_total_price(orderTotalPrice);
            invoices.add(invoice);
        }
        return invoices;
    }
}
