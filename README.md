```bash
docker build -t jats-validator .
docker run --rm -p 8081:8081 -e HOSTNAME=0.0.0.0 -e PORT=8081 jats-validator
```
