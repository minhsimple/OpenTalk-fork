# Git Branch Naming Guidelines for Manage Opentalk Website

## ✅ General Format

```
<type>/<role>-<module>-<short-description>
```

- `type`: feature, fix, refactor, hotfix, test, docs, release
- `role`: api (backend), screen (frontend)
- `module`: functional module (auth, employee, opentalk, etc.)
- `short-description`: kebab-case, English, concise

---

## 📌 Suggested Branch Names by Feature

| Feature                       | Backend Branch Name                         | Frontend Branch Name                  |
| ----------------------------- | ------------------------------------------- | ------------------------------------- |
| 🔐 Authentication             | feature/be-auth-login-jwt                   | feature/fe-auth-login-screen          |
| 👥 Employee Management        | feature/be-employee-sync-hrm                | feature/fe-employee-list-filter       |
| 🗓 Opentalk Management         | feature/be-opentalk-create                  | feature/fe-opentalk-register-form     |
| 🖼 Slide Upload                | feature/be-slide-upload-handler             | feature/fe-slide-upload-ui            |
| 🎰 Opentalk Lottery           | feature/be-lottery-random-host              | feature/fe-lottery-notification-modal |
| ⏰ Dynamic Cronjob Config     | feature/be-cronjob-lottery-config           | _(Not applicable)_                    |
| 📄 Employee Filters           | feature/be-employee-filter-by-branch-status | feature/fe-employee-advanced-filters  |
| 🏢 Branch Management          | feature/be-branch-management-api            | feature/fe-branch-select-dropdown     |
| 🧾 Opentalk Topics Management | feature/be-topic-create-edit-delete         | feature/fe-topic-input-form           |
| 📊 Opentalk Session Listing   | feature/be-opentalk-pagination-filters      | feature/fe-opentalk-list-table        |
| 📧 Email Notification         | feature/be-email-thymeleaf-reminder         | _(Not applicable)_                    |
| 🌐 Internationalization       | feature/be-i18n-config-support              | feature/fe-i18n-language-toggle       |
| 🔍 Query Optimization         | refactor/be-query-cache-pagination          | _(Not applicable)_                    |
| 🧪 Testing                    | test/be-opentalk-controller-test            | test/fe-opentalk-screen-test          |
| 🚀 Release                    | release/be-v1.0.0                           | release/fe-v1.0.0                     |

---

## ✏️ Commit Message Format

```
<type> - <module>: <short-description>
```

### Examples:

- `feat(auth): implement JWT login endpoint`
- `fix(employee): correct HRM sync bug`
- `refactor(opentalk): optimize schedule fetching logic`
- `test(slide): add unit test for upload controller`

### Conventional Commit Types:

- `feat`: new feature
- `fix`: bug fix
- `refactor`: code restructuring
- `test`: test related
- `docs`: documentation update
- `chore`: minor changes not affecting logic

---

## 🔀 Pull Request Naming Template

```
[type] [module] - short description
```

### Examples:

- `[Feature] Auth - JWT login API`
- `[Fix] Employee - Sync error on HRM import`
- `[Refactor] Opentalk - Clean up service layer`
- `[Test] Slide - Unit test for upload`

👉 **Tips:**

- Always link to related ticket/task (JIRA/GitHub issue).
- Use checklists in PR description to review key items.

---

## 🛠 Naming Tips

- Use lowercase letters and `-` to separate words.
- Keep it short but descriptive enough to identify the task.
- Include Jira/task ID if your workflow uses it:

  - Example: `feature/be-opentalk-create-JIRA123`

---

## 🧠 Why Follow This?

- Easier to track features and ownership.
- Clear separation of backend vs frontend responsibilities.
- Cleaner Git history and collaboration.

---

Happy branching! 🌿
