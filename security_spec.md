# Security Specification for Trust Auto Trader Firestore

## 1. Data Invariants
- `vehicles`: Publicly readable inventory list; write operations restricted to authenticated administrators.
- `sourcingRequests`: Any client (authenticated or guest) can create a sourcing request; reading or modifying sourcing requests is restricted to administrators.
- `enquiries`: Any client can submit a wholesale price enquiry; reading or modifying enquiries is restricted to administrators.

## 2. Dirty Dozen Payloads & Attack Scenarios
1. **Unauthenticated Catalog Wipe**: Unauthenticated user attempts `delete` on `/vehicles/veh-001` -> REJECTED.
2. **Catalog Spoofing**: Guest attempts `setDoc` on `/vehicles/fake-001` -> REJECTED.
3. **Privilege Escalation**: Non-admin attempts to create a document in `/admins/{uid}` -> REJECTED.
4. **Enquiry PII Leak**: Unauthenticated user attempts `getDoc` on `/enquiries/{enquiryId}` -> REJECTED.
5. **Enquiry List Harvesting**: Anonymous user attempts `getDocs` on `/enquiries` -> REJECTED.
6. **Sourcing Request Modification**: Client attempts to modify another user's sourcing request -> REJECTED.
7. **Junk ID Injection**: Client attempts `setDoc` with 1KB malformed path ID -> REJECTED by `isValidId()`.
8. **Malicious Oversized Field Injection**: Client attempts to write 100KB string to `fullName` -> REJECTED by schema length checks.
9. **Status Fast-forward Injection**: Guest attempts to overwrite vehicle status from AVAILABLE to SOLD -> REJECTED.
10. **System Field Tampering**: User attempts to forge `createdAt` with arbitrary past date -> REJECTED.
11. **Spoofed Email Admin Entry**: User with unverified email attempts to claim admin access -> REJECTED.
12. **Blanket Query Access**: Attacker sends unbounded query without ownership filter -> REJECTED.
