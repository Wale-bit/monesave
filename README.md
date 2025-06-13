### Consent

- `POST /api/consent/request-parent`  
  Request parental consent for a top-up or transfer.  
  **Body:**
  ```json
  {
    "junior_id": "your-junior-id",
    "action_type": "top-up" // or "transfer"
  }
  ```

### Parent

- `POST /api/parents/approve`  
  Link a junior to a parent.  
  **Body:**
  ```json
  {
    "junior_id": "your-junior-id",
    "parent_id": "your-parent-id"
  }
  ```

### QuickBooks

- `GET /quickbooks/connect`  
  Start QuickBooks OAuth2 flow.

- `GET /quickbooks/callback`  
  Handle QuickBooks OAuth2 callback.



## Environment Variables


```
SUPABASE_URL=
SUPABASE_KEY=
PORT=4000

QB_CLIENT_ID=
QB_CLIENT_SECRET=
QB_REDIRECT_URI=http://localhost:4000/quickbooks/callback
```

EMAIL_USER=
FINANCE_EMAIL=
SUPPORT_EMAIL=
MAILJET_API_KEY=
MAILJET_API_SECRET=
