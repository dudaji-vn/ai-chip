import datetime
import pytz
import requests
import time


def make_request_to_clusters_api(url):
    """Make a GET request to the specified URL and print the response."""
    response = requests.get(url)
    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.status_code)


def test_api_for_duration(url, duration_seconds, interval_seconds):
    """Test the API repeatedly for a given duration."""
    end_time = time.time() + duration_seconds
    while time.time() < end_time:
        make_request_to_clusters_api(url)
        time.sleep(interval_seconds)


def get_utc_time_korean_time_offset(minutes_offset):
    # 현재 한국 시간을 구합니다.
    korean_time = datetime.datetime.now(pytz.timezone("Asia/Seoul"))

    # 한국 시간으로부터 원하는 분(minutes_offset)만큼 뺀 시간을 구합니다.
    korean_time_offset = korean_time - datetime.timedelta(minutes=minutes_offset)

    # UTC 시간으로 변환합니다.
    utc_time_offset = korean_time_offset.astimezone(pytz.utc)
    return utc_time_offset


def test_cluster_api():
    end_time = get_utc_time_korean_time_offset(0)  # 현재 UTC 시간
    start_time = get_utc_time_korean_time_offset(60)  # 10분 전 UTC 시간

    # ISO 8601 포맷으로 시간을 문자열로 변환
    start_time_str = start_time.strftime("%Y-%m-%dT%H:%M:%S")
    end_time_str = end_time.strftime("%Y-%m-%dT%H:%M:%S")

    # API 요청 URL
    url = f"http://localhost:5555/api/v1/clusters?start_time={start_time_str}&end_time={end_time_str}"

    # API 요청 및 응답 출력
    response = requests.get(url)
    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.status_code, response.text)


def test_server_api():
    end_time = get_utc_time_korean_time_offset(0)  # 현재 UTC 시간
    start_time = get_utc_time_korean_time_offset(60)  # 10분 전 UTC 시간

    # ISO 8601 포맷으로 시간을 문자열로 변환
    start_time_str = start_time.strftime("%Y-%m-%dT%H:%M:%S")
    end_time_str = end_time.strftime("%Y-%m-%dT%H:%M:%S")

    # API 요청 URL
    url = f"http://localhost:5555/api/v1/servers?start_time={start_time_str}&end_time={end_time_str}"

    # API 요청 및 응답 출력
    response = requests.get(url)
    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.status_code, response.text)


# API 테스트 실행


def test_npu_api():
    end_time = get_utc_time_korean_time_offset(0)  # 현재 UTC 시간
    start_time = get_utc_time_korean_time_offset(10)  # 10분 전 UTC 시간

    # ISO 8601 포맷으로 시간을 문자열로 변환
    start_time_str = start_time.strftime("%Y-%m-%dT%H:%M:%S")
    end_time_str = end_time.strftime("%Y-%m-%dT%H:%M:%S")

    # API 요청 URL
    url = f"http://localhost:5555/api/v1/npus?start_time={start_time_str}&end_time={end_time_str}"

    # API 요청 및 응답 출력
    response = requests.get(url)
    if response.status_code == 200:
        print("Response:", response.json())
    else:
        print("Error:", response.status_code, response.text)


from datetime import datetime, timedelta

# 현재 시간
current_time = datetime.now()

# 10분 전 시간
time_10_minutes_ago = current_time - timedelta(minutes=10)

# ISO 8601 포맷으로 변환
current_time_iso = current_time.isoformat()
time_10_minutes_ago_iso = time_10_minutes_ago.isoformat()

print("Current Time: ", current_time_iso)
print("Time 10 Minutes Ago: ", time_10_minutes_ago_iso)


test_cluster_api()
test_server_api()
test_npu_api()


# URL of the API endpoint
api_url = "http://localhost:5555/api/v1/clusters"  # Adjust the URL as needed

# Test the API every 10 seconds for 100 seconds
# test_api_for_duration(api_url, duration_seconds=100, interval_seconds=10)
