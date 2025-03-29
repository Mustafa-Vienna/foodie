# 🧪 Foody - Testing Report

> [!NOTE]  
> Return back to the [README.md](README.md) file.

---

## 📋 Contents

1. [Manual Testing](#manual-testing)
   - [Authentication](#authentication)
   - [Navbar / Footer](#navbar--footer)
   - [Create / Edit Post](#create--edit-post)
   - [Like & Comment](#like--comment)
   - [User Profile](#user-profile)
   - [Liked Page](#liked-page)
   - [Preview Page](#preview-page)
   - [Navigation Tests](#navigation-tests)
2. [Browser Compatibility](#browser-compatibility)
3. [Responsiveness](#responsiveness)
4. [Device Testing](#device-testing)
5. [Lighthouse Testing](#lighthouse-testing)
6. [Known Bugs](#known-bugs)
7. [Unfixed Bugs](#unfixed-bugs)

---

## ✅ Manual Testing

### Authentication

#### US01: As a new user, I can register to access the platform.

| Test ID     | Test Scenario                   | Steps                                                              | Expected Result                                              | Status   | Image |
|-------------|----------------------------------|--------------------------------------------------------------------|--------------------------------------------------------------|----------|--------|
| US01-TS01   | Registration form is accessible  | Navigate to the `/signup` page                                     | Form with username, email, and password fields is displayed  | ✅ Pass  | ![US01-TS01](readme_assets/manual_tests/US01-TS01.png) |
| US01-TS02   | Register with valid input        | Fill in valid username, email, password, confirm password → Submit | User is registered, redirected to homepage, auto-logged in   | ✅ Pass | ![US01-TS01](readme_assets/manual_tests/US01-TS02.png) |
| US01-TS03   | Password mismatch validation     | Enter mismatching passwords and click "Sign Up"                    | Error: "Passwords do not match!" shown below the fields      | ✅ Pass  | ![US01-TS03](readme_assets/manual_tests/US01-TS03.png) |
| US01-TS04   | Empty fields validation          | Leave all required fields empty and submit                         | Error messages displayed for each missing field              | ✅ Pass  | ![US01-TS04](readme_assets/manual_tests/US01-TS04.png) |
| US01-TS05   | Password strength check          | Enter a password with less than 6 characters (e.g., `12345`)       | Error: "Password must be at least 6 characters long!"        | ✅ Pass  | ![US01-TS05](readme_assets/manual_tests/US01-TS05.png) |
| US01-TS06   | Form interaction hover feedback  | Hover over fields and the Sign Up button                           | Input and button highlight feedback on hover is visible      | ✅ Pass  | ![US01-TS06](readme_assets/manual_tests/US01-TS06.png) |




#### US02: As a user, I can log in to use the app.

| Test ID | Test Scenario | Steps | Expected Result | Status |



#### US03: As a logged-in user, I can log out.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|



---

### Navbar / Footer

#### US04: As any user, I can see a consistent navbar and footer.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|


---

### Create / Edit Post

#### US05: As a logged-in user, I can create a new post.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|



#### US06: As a user, I can preview before posting.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|



---

### Like & Comment

#### US07: As a user, I can like and unlike posts.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|




#### US08: As a user, I can comment on posts.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|



---

### User Profile

#### US09: As a user, I can view and edit my profile.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|




---

### Liked Page

#### US10: As a user, I can view all liked posts.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|




---

### Preview Page

#### US11: As a user, I can preview before submitting.

| Test ID | Test Scenario | Steps | Expected Result | Status |
|--------|----------------|-------|------------------|--------|



---

### Navigation Tests

| Page | Links Tested | Result |
|------|--------------|--------|




---

## 🌐 Browser Compatibility

| Browser | Pages Tested | Notes |
|---------|--------------|-------|
| Chrome | All major pages | ✅ Fully supported |
| Safari | Home, Profile, Post | ✅ Fully supported |
| Firefox | Feed, Post, Preview | ✅ Fully supported |

---

## 📱 Responsiveness

Tested via Chrome DevTools and real devices.

| Device | Pages Tested | Result |
|--------|--------------|--------|
| iPhone 15 Pro | All pages | ✅ Responsive |
| iPad Mini | All pages | ✅ Responsive |
| Desktop | All | ✅ |

---

## 💡 Lighthouse Testing

| Page | Mobile | Desktop | Notes |
|------|--------|---------|-------|



---

## 🐞 Known Bugs

| ID | Bug Description | Status | Screenshot |
|----|------------------|--------|------------|
| BUG01 | Profile edit does not save avatar instantly | ❌ Open | _To be added_ |


---

## 🚫 Unfixed Bugs




---

[Go to Top](#top)
