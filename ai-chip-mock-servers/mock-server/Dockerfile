FROM python:3.8

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5555
ENV DOCKER_ENV=true

CMD ["python", "./main/app.py"]