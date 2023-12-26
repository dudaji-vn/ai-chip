### AI Chip(NPU) Monitoring Tool Mock Server


### Quickstart

* build and deploy on gcp 
```bash
./quick.sh
```

* test on local
```bash
pip install -r requirements.txt
python app.py
```

* test API on local
```bash
# local
curl localhost:5556/api/v1/users
curl localhost:5556/api/v1/clusters
curl localhost:5556/api/v1/servers
curl localhost:5556/api/v1/npus
```


### generator.py
* make mock data for user (fixed)
* make mock datas for cluster -> servers -> npus 


### TODOs
* add data to influxdb for time-series data of metrics
* add inference endpoint (maybe not mock, but only 2 endpoints)
* add storage endpoint (maybe mock)



