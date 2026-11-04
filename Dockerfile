# ==========================================
# 1. Giai đoạn Biên dịch (Build Stage)
# ==========================================
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /workspace

# Cấu hình mirror Google Cloud Maven Central để tránh lỗi rate limit 429 Too Many Requests từ repo.maven.apache.org
COPY backend/settings.xml /root/.m2/settings.xml

# Sao chép mã nguồn backend
COPY backend/pom.xml .
COPY backend/src ./src

# Đóng gói file .jar (bỏ qua unit tests để build nhanh, dùng Google mirror)
RUN mvn clean package -DskipTests -s /root/.m2/settings.xml

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
