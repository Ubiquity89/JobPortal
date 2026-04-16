import json
import urllib.request as request
import urllib.error as error
import http.cookiejar as cookiejar

BASE_URL = "http://localhost:8000"

user_payload = {
    "fullname": "Test User",
    "email": "testuser@example.com",
    "phoneNumber": "1234567890",
    "password": "Password1!",
    "role": "recruiter",
}

login_payload = {
    "email": "testuser@example.com",
    "password": "Password1!",
    "role": "recruiter",
}

company_payload = {"companyName": "Test Company"}
job_payload = {
    "title": "Test Job",
    "description": "Test job description.",
    "requirements": "python,node,react",
    "salary": "50000",
    "location": "Remote",
    "jobType": "Full-time",
    "experience": "Mid",
    "position": "Developer",
    "companyId": None,
}

jar = cookiejar.CookieJar()
opener = request.build_opener(request.HTTPCookieProcessor(jar))


def send_request(method, path, payload=None):
    url = BASE_URL + path
    data = json.dumps(payload).encode("utf-8") if payload is not None else None
    req = request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    try:
        with opener.open(req, timeout=10) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            return resp.status, body
    except error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")
    except Exception as exc:
        return "ERROR", str(exc)


def print_result(path, status, body):
    print(f"{path} -> {status}")
    print(body[:500])
    print("---")


if __name__ == "__main__":
    print("[1] Register user")
    status, body = send_request("POST", "/api/v1/user/register", user_payload)
    print_result("POST /api/v1/user/register", status, body)

    print("[2] Login user")
    status, body = send_request("POST", "/api/v1/user/login", login_payload)
    print_result("POST /api/v1/user/login", status, body)

    if any(cookie.name == "token" for cookie in jar):
        print("[3] Authenticated checks")
        status, body = send_request("POST", "/api/v1/user/profile/update", {
            "fullname": "Test User",
            "email": "testuser@example.com",
            "phoneNumber": "1234567890",
            "bio": "Testing profile update.",
            "skills": "python,testing",
        })
        print_result("POST /api/v1/user/profile/update", status, body)

        status, body = send_request("POST", "/api/v1/company/register", company_payload)
        print_result("POST /api/v1/company/register", status, body)
        company_id = None
        if status == 201:
            try:
                company_id = json.loads(body).get("company", {}).get("_id")
            except Exception:
                company_id = None

        status, body = send_request("POST", "/api/v1/company/get")
        print_result("POST /api/v1/company/get", status, body)
        if status == 200 and not company_id:
            try:
                companies = json.loads(body).get("companies", [])
                if companies:
                    company_id = companies[0].get("_id")
            except Exception:
                company_id = None

        if company_id:
            status, body = send_request("GET", f"/api/v1/company/get/{company_id}")
            print_result(f"GET /api/v1/company/get/{company_id}", status, body)

            status, body = send_request("PUT", f"/api/v1/company/update/{company_id}", {"name": "Updated Company"})
            print_result(f"PUT /api/v1/company/update/{company_id}", status, body)
        else:
            print("Skipping company get/update by ID because company ID was not available.")
            print("---")

        if company_id:
            job_payload["companyId"] = company_id
        status, body = send_request("POST", "/api/v1/job/post", job_payload)
        print_result("POST /api/v1/job/post", status, body)

        job_id = None
        if status == 201:
            try:
                job_id = json.loads(body).get("job", {}).get("_id")
            except Exception:
                job_id = None

        status, body = send_request("GET", "/api/v1/job/get")
        print_result("GET /api/v1/job/get", status, body)

        status, body = send_request("POST", "/api/v1/job/getadminjobs")
        print_result("POST /api/v1/job/getadminjobs", status, body)

        if job_id:
            status, body = send_request("GET", f"/api/v1/job/get/{job_id}")
            print_result(f"GET /api/v1/job/get/{job_id}", status, body)
        else:
            print("Skipping job get by ID because job ID was not available.")
            print("---")
    else:
        print("Auth cookie was not received; protected routes were not tested.")
