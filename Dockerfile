# ==========================================
# 1. Giai đoạn Biên dịch (Build Stage)
# ==========================================
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /workspace

# Sao chép mã nguồn backend
COPY backend/pom.xml .
COPY backend/src ./src

# Đóng gói file .jar (bỏ qua unit tests để build nhanh)
RUN mvn clean package -DskipTests

# ==========================================
# 2. Giai đoạn Thực thi (Runtime Stage)
# ==========================================
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Sao chép file .jar từ build stage
COPY --from=builder /workspace/target/*.jar app.jar

EXPOSE 8080
ENV PORT=8080

# Chạy ứng dụng Spring Boot, tự động nhận PORT từ Render/Railway
ENTRYPOINT ["sh", "-c", "java -Dserver.port=${PORT} -jar app.jar"]
