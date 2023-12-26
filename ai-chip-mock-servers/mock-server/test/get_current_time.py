from datetime import datetime, timedelta

# 현재 UTC 시간
current_utc_time = datetime.utcnow()

# 1분 전 UTC 시간
one_minute_ago_utc_time = current_utc_time - timedelta(minutes=1)

# ISO 8601 포맷으로 변환
current_utc_time_iso = current_utc_time.isoformat()
one_minute_ago_utc_time_iso = one_minute_ago_utc_time.isoformat()

print("Current UTC Time: ", current_utc_time_iso)
print("One Minute Ago UTC Time: ", one_minute_ago_utc_time_iso)
