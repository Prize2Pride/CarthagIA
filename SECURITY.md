# 🔒 CarthagIA Security Policy

## Security Overview

CarthagIA is a critical infrastructure platform for governance and citizen engagement. Security is paramount. This document outlines our security practices, policies, and guidelines.

---

## 🛡️ Security Principles

1. **Zero Trust Architecture** - Verify every access request
2. **Encryption First** - All data encrypted in transit and at rest
3. **Least Privilege** - Users have minimum necessary permissions
4. **Audit Everything** - Complete audit trails for all actions
5. **Defense in Depth** - Multiple layers of security controls

---

## 🔐 Authentication & Authorization

### OAuth 2.0 Implementation
- Manus OAuth integration for secure authentication
- JWT tokens with 1-hour expiration
- Refresh tokens with 30-day expiration
- Automatic token rotation on sensitive operations

### Role-Based Access Control (RBAC)
```typescript
enum UserRole {
  ADMIN = "admin",      // Full platform access
  USER = "user",        // Standard citizen access
  MODERATOR = "mod",    // Content moderation
  AUDITOR = "auditor"   // Read-only audit access
}
```

### Multi-Factor Authentication (MFA)
- Required for admin accounts
- Optional for all users
- TOTP (Time-based One-Time Password) support
- Backup codes for account recovery

---

## 🔑 Secrets Management

### Environment Variables
- **NEVER** commit `.env` files to version control
- Use `.env.example` for documentation only
- Rotate secrets every 90 days
- Use strong, random values (minimum 32 characters)

### Sensitive Data
```env
# ✅ CORRECT - Use environment variables
DATABASE_URL=mysql://user:${DB_PASSWORD}@host:3306/db
JWT_SECRET=${RANDOM_SECRET_32_CHARS}

# ❌ WRONG - Never hardcode
DATABASE_URL=mysql://user:password123@localhost:3306/db
```

### Secret Rotation
- Database credentials: Every 90 days
- API keys: Every 60 days
- JWT secrets: Every 30 days
- OAuth tokens: Automatic (1-hour expiration)

---

## 🗄️ Database Security

### Connection Security
- SSL/TLS encryption required
- Connection pooling with max 10 connections
- Automatic connection timeout (30 seconds)
- Prepared statements for all queries

### Data Protection
- Row-level security (RLS) for sensitive data
- Encryption at rest for PII (Personally Identifiable Information)
- Automatic backups every 6 hours
- Point-in-time recovery enabled

### Access Control
```sql
-- Example: Citizen can only see their own data
CREATE POLICY citizen_data_isolation ON ideas
  USING (user_id = current_user_id);

-- Example: Admins can see everything
CREATE POLICY admin_full_access ON ideas
  USING (current_user_role = 'admin');
```

---

## 🌐 API Security

### Rate Limiting
- 100 requests/minute per IP
- 1000 requests/hour per authenticated user
- Exponential backoff on repeated failures
- DDoS protection via Cloudflare

### Input Validation
```typescript
// ✅ Always validate and sanitize input
const createIdea = publicProcedure
  .input(z.object({
    title: z.string().min(5).max(200),
    description: z.string().min(10).max(5000),
    phaseId: z.number().int().positive()
  }))
  .mutation(async ({ input }) => {
    // Sanitize HTML
    const sanitized = sanitizeHtml(input.description);
    // Validate phase exists
    const phase = await db.phases.findById(input.phaseId);
    if (!phase) throw new Error("Invalid phase");
    // Create idea
    return db.ideas.create(sanitized);
  });
```

### CORS Policy
```typescript
// Only allow requests from trusted origins
const corsOptions = {
  origin: [
    'https://carthroad-eq3lebcq.manus.space',
    'https://www.carthagIA.com',
    'https://admin.carthagIA.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

---

## 🔍 Audit & Logging

### Audit Trail
Every action is logged with:
- User ID and role
- Action type and timestamp
- IP address and user agent
- Request/response summary
- Success/failure status

```typescript
// Audit log entry
{
  userId: "user-123",
  role: "admin",
  action: "idea_approved",
  timestamp: "2026-05-13T10:30:00Z",
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  details: {
    ideaId: "idea-456",
    phaseId: 1,
    reason: "Aligns with phase goals"
  },
  status: "success"
}
```

### Log Retention
- Application logs: 90 days
- Audit logs: 2 years (immutable)
- Error logs: 30 days
- Security events: 5 years

### Log Access
- Restricted to security team
- Encrypted at rest
- Tamper detection enabled
- Real-time alerting for suspicious activity

---

## 🚨 Incident Response

### Security Incident Classification

| Severity | Description | Response Time |
|----------|-------------|----------------|
| **Critical** | Data breach, system compromise | 15 minutes |
| **High** | Unauthorized access, data loss | 1 hour |
| **Medium** | Security vulnerability, failed auth | 4 hours |
| **Low** | Configuration issue, minor bug | 24 hours |

### Incident Response Process
1. **Detect** - Automated monitoring alerts security team
2. **Contain** - Isolate affected systems
3. **Investigate** - Determine scope and impact
4. **Remediate** - Fix vulnerability and restore systems
5. **Communicate** - Notify affected users
6. **Review** - Post-incident analysis and improvements

### Security Contacts
- **Security Team**: security@carthagIA.com
- **Emergency**: +216 20579336
- **Founder**: professor.raoued.fadhel@gmail.com

---

## 🔄 Vulnerability Management

### Vulnerability Scanning
- Weekly automated scans (OWASP Top 10)
- Monthly penetration testing
- Quarterly third-party security audits
- Continuous dependency vulnerability checks

### Dependency Updates
```bash
# Check for vulnerabilities
npm audit

# Update dependencies safely
npm update --save

# Review security advisories
npm audit fix
```

### Responsible Disclosure
If you discover a security vulnerability:
1. **DO NOT** post it publicly
2. **Email** security@carthagIA.com with details
3. **Include** proof of concept (if safe)
4. **Wait** for response (typically 48 hours)
5. **Coordinate** on disclosure timeline

---

## 🛠️ Development Security

### Code Review
- All code requires peer review
- Security team reviews sensitive changes
- Automated security checks on pull requests
- No direct commits to main branch

### Secure Coding Practices
```typescript
// ❌ WRONG - SQL injection vulnerability
const idea = db.query(`SELECT * FROM ideas WHERE id = ${ideaId}`);

// ✅ CORRECT - Parameterized query
const idea = db.query('SELECT * FROM ideas WHERE id = ?', [ideaId]);

// ❌ WRONG - Hardcoded secrets
const apiKey = "sk_live_abc123xyz";

// ✅ CORRECT - Environment variables
const apiKey = process.env.STRIPE_API_KEY;

// ❌ WRONG - No input validation
app.post('/ideas', (req, res) => {
  const idea = req.body;
  db.ideas.create(idea);
});

// ✅ CORRECT - Validate all input
app.post('/ideas', (req, res) => {
  const validated = ideaSchema.parse(req.body);
  db.ideas.create(validated);
});
```

### Dependency Management
- Use exact versions (no wildcards)
- Regular security updates
- Automated dependency scanning
- Lock file committed to repository

---

## 🌍 Deployment Security

### Infrastructure Security
- All traffic encrypted (TLS 1.3+)
- DDoS protection enabled
- Web Application Firewall (WAF) active
- Intrusion detection system (IDS) monitoring

### Container Security
```dockerfile
# ✅ CORRECT - Minimal base image
FROM node:22-alpine

# ❌ WRONG - Large base image
FROM ubuntu:22.04

# ✅ CORRECT - Non-root user
RUN useradd -m -u 1000 app
USER app

# ✅ CORRECT - Security scanning
RUN npm audit --audit-level=moderate
```

### Database Backups
- Automated daily backups
- Encrypted backup storage
- Point-in-time recovery capability
- Tested restoration procedures

---

## 📋 Compliance

### Standards & Frameworks
- **OWASP Top 10** - Web application security
- **GDPR** - Data protection (EU)
- **ISO 27001** - Information security management
- **SOC 2** - Security, availability, processing integrity

### Data Privacy
- Minimal data collection
- User consent required for data use
- Right to access and delete data
- Data retention policies enforced
- Privacy by design principles

---

## 🔔 Security Monitoring

### Real-Time Alerts
- Failed login attempts (>5 in 15 min)
- Unusual API access patterns
- Database query anomalies
- File system changes
- Network traffic spikes

### Monitoring Tools
- Prometheus for metrics
- ELK Stack for logs
- Grafana for dashboards
- AlertManager for notifications

---

## 📚 Security Training

### Required Training
- All developers: Secure coding (annually)
- All staff: Security awareness (quarterly)
- Security team: Advanced topics (monthly)
- Admins: Access control and audit (semi-annually)

### Resources
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [SANS Top 25](https://www.sans.org/top25-software-errors/)

---

## 📞 Support

**Security Questions?**
- Email: security@carthagIA.com
- Phone: +216 20579336
- Founder: professor.raoued.fadhel@gmail.com

**Report a Vulnerability?**
- Use responsible disclosure process
- Email: security@carthagIA.com
- Response time: 48 hours

---

## 📝 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-05-13 | Initial security policy |

---

**Last Updated**: May 13, 2026  
**Next Review**: August 13, 2026

---

*CarthagIA Security is everyone's responsibility. Thank you for helping keep our platform secure.* 🔒
