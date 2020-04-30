FROM python:3.8-alpine

RUN adduser --shell /bin/bash --uid 1000 --system --home /home/appuser --disabled-password appuser

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt

RUN chown appuser /home/appuser

WORKDIR /home/appuser
USER appuser

COPY . .

CMD ["python", "./main.py"]
