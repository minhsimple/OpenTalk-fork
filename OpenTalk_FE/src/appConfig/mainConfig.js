export const mainConfig = {
	APP: {
		TITLE: 'NCCPLUS',
		LOGO: '/assets/img/scheduler-logo.svg',
		AUTHOR: {
			TITLE: 'NCC ASIA',
			LOGO: '/assets/img/gig-grafter-logo-light.png',
		},
		ROUTES: {
			HOME: {
				TITLE: 'Home',
				URI: '/',
				CONTENT: {
					INTRODUCTION: {
						LEAD: 'Drive your business forward with fast and flexible employee&nbsp;scheduling.',
						OVERVIEW: '<p>Our <strong>Online Rota Software</strong> lets you quickly create <strong>budgeted schedules</strong> to meet changing demand and <strong>employee&nbsp;availability</strong>.</p><p><strong><u>Try Now for Free - No Credit Card or Debit Card Required</u></strong></p><p>Why not dive on in and create your <strong>first&nbsp;Rota</strong>.</p>',
						CALL_TO_ACTION: {
							TITLE: 'Start Scheduling for FREE',
							URI: '/register',
						},
						IMAGE: '/assets/img/feature-image-mockup.png',
					},
					CREATE: {
						LEAD: 'Create',
						OVERVIEW: '<p><strong>Create Fast and Flexible Schedules in&nbsp;minutes</strong></p><p>Our intuitive weekly rota calendar enables you to add and assign shifts to each employee&nbsp;instantly.</p><p><strong>Need to control labour costs</strong></p><p>No problem. Simply assign a budget to each weekly rota and our smart scheduling provides instant cost comparisons to keep you and your managers&nbsp;on&nbsp;track.</p>',
						IMAGE: '/assets/img/benefits-create.png',
					},
					PUBLISH: {
						LEAD: 'Publish',
						OVERVIEW: '<p><strong>Publish Your Rota at the Touch&nbsp;of&nbsp;a&nbsp;Button</strong></p><p>Each employee receives instant notifications by SMS and email letting them know when they are scheduled&nbsp;to&nbsp;work.</p><p>No guess work, no confusion, no phone calls from staff wondering when they are working next &#8212; just more time for you and your managers to focus on growing your&nbsp;business.</p>',
						IMAGE: '/assets/img/benefits-publish.png',
					},
					MANAGE: {
						LEAD: 'Manage',
						OVERVIEW: '<p></p>',
						IMAGE: '/assets/img/benefits-manage.png',
					},
					PROMO: {
						LEAD: '',
						OVERVIEW: '<p>Efficient and affordable workforce management tools designed for smaller businesses.</p>',
						IMAGE: '/assets/img/ipad-mockup-scheduler.png',
					},
					ABOUT: {
						LEAD: 'About',
						OVERVIEW: '<p></p>',
					},
					SMS: {
						LEAD: '',
						OVERVIEW: '<p>Employees receive&nbsp;instant notifications by SMS and email alerting them to shift changes and&nbsp;updates.</p>',
						IMAGE: '/assets/img/iphone-mockup-message.png',
					},
					BETA: {
						LEAD: 'Beta Release',
						OVERVIEW: '<p class="question"></p>',
					},
					PRICING: {
						LEAD: 'Pricing',
						OVERVIEW: '',
						SUBSCRIPTIONS: [
							{
								TITLE: 'Beta Release',
								PRICE: 'Free *',
								DESCRIPTION: '<p></p>',
							},
						],
						FOOT_NOTES: '<p>* At the end of the beta period we anticipate that the application will be charged at £1 per active employee per month. An active employee will be one who has been scheduled or engaged with the application during that month. For example, if you have 20 employees you may expect costs of £20 per month.</p>',
					},
					SERVICE_UPDATES: {
						LEAD: '',
						OVERVIEW: '<p></p>',
						CALL_TO_ACTION: {
							TITLE: 'Keep me updated',
						},
					},
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
			},
			LOGIN: {
				TITLE: 'Login',
				URI: '/login',
				CONTENT: {
					WELCOME: '',
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
				IMAGE: '/assets/img/NCC-family.jpg',
			},
			LOGOUT: {
				TITLE: 'Logout',
			},
			ACCOUNT_SETTINGS: {
				TITLE: 'Settings',
			},
			SETTINGS: {
				UPDATE: {
					TITLE: 'Update Settings',
				},
			},
			EMPLOYEES: {
				DELETE: {
					TITLE: 'Delete Employee',
				},
				UPDATE: {
					TITLE: 'Update Employee',
				},
				CREATE: {
					TITLE: 'Create Employee',
				},
				UPLOAD: {
					TITLE: 'Upload Employees',
				},
				EXISTING: {
					TITLE: 'Update Rota Employees',
				},
			},
			ROLES: {
				DELETE: {
					TITLE: 'Delete Role',
				},
				UPDATE: {
					TITLE: 'Update Role',
				},
				CREATE: {
					TITLE: 'Create Role',
				},
			},
			SHIFTS: {
				DELETE: {
					TITLE: 'Delete Shift',
				},
				UPDATE: {
					TITLE: 'Update Shift',
				},
				CREATE: {
					TITLE: 'Create Shift',
				},
				ASSIGN: {
					TITLE: 'Assign Shift',
				},
			},
			ROTAS: {
				DELETE: {
					TITLE: 'Delete Rota',
				},
				UPDATE: {
					TITLE: 'Update Rota',
				},
				CREATE: {
					TITLE: 'Create Rota',
					MESSAGE: '<p></p>',
				},
				STATUSES: {
					DRAFT: 'DRAFT',
					EDITED: 'EDITED',
					PUBLISHED: 'PUBLISHED',
				},
			},
			UNAVAILABILITIES: {
				DELETE: {
					TITLE: 'Delete Time Off',
				},
				UPDATE: {
					TITLE: 'Update Time Off',
				},
				CREATE: {
					TITLE: 'Create Time Off',
				},
			},

			EMPLOYEEWORKREMOTE: {
				CREATE: {
					TITLE: 'Creat Work Remote',
				},
				UPDATE: {
					TITLE: 'Update Work Remote',
				},
			},

			REGISTER: {
				TITLE: 'Register',
				URI: '/register',
				CONTENT: {
					WELCOME: '',
					TERMS_OF_USE_AGREED: 'By clicking this box we have read, understood and accept to at all times be bound by the NCC ASIA Beta Release Terms and Conditions as contained within',
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
			},
			USER_SIGN_UP: {
				TITLE: 'User Sign Up ',
				URI: '/user-sign-up',
				CONTENT: {
					WELCOME: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta velit in lectus efficitur hendrerit. Quisque cursus arcu sollicitudin rhoncus molestie. Donec at rhoncus enim, ut rhoncus lacus. Sed eget felis est.',
					TERMS_OF_USE_AGREED: 'By clicking this box we have read, understood and accept to at all times be bound by the NCC ASIA Beta Release Terms and Conditions as contained within',
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
			},
			PAGE_NOT_FOUND: {
				TITLE: 'Page Not Found',
				CONTENT: {
					WELCOME: '<p class="lead">What does this mean?</p><p>We couldn&#39;t find the page you requested on our servers.</p><p>We&#39;re really sorry about that. It&#39;s our fault, not yours.</p><p>We&#39;ll work hard to get this page back online as soon as possible.</p><p>Perhaps you would like to go back or go to our homepage?</p>',
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
			},
			DASHBOARD: {
				HOME: {
					TITLE: 'Dashboard',
					URI: '/dashboard',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				EMPLOYEES: {
					TITLE: 'Employees',
					URI: '/dashboard/employees',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				EXPORT: {
					TITLE: 'Export',
					URI: '/dashboard/export',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				MY_EXCEPTION: {
					TITLE: 'My Exception',
					URI: '/dashboard/exceptions',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				MANAGE_DEVICES: {
					TITLE: 'Manage Device',
					URI: '/dashboard/manage-device',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				IMAGES_VERIFY: {
					TITLE: 'Images verify',
					TITLE_2: 'Images',
					URI: '/dashboard/images-verify',
					URI_2: '/dashboard/images',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				SETTINGS: {
					TITLE: 'Settings',
					URI: '/dashboard/settings',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				SUPPORT: {
					TITLE: 'Support',
					URI: 'https://help.checkin.nccsoft.vn',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				PAYROLL: {
					TITLE: 'Payroll',
					URI: '/dashboard/payroll',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				ACCOUNT_SETTINGS: {
					TITLE: 'Account Settings',
					URI: '/dashboard/account_settings',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				EMPLOYEE_REPORTS: {
					TITLE: 'Employee reports',
					URI: '/dashboard/employee_reports',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
				COMPANY_BRANCH: {
					TITLE: 'Company Branch',
					URI: '/dashboard/company_branch',
					META: {
						DESCRIPTION: '',
						KEYWORDS: '',
					},
				},
			},
			TERMS_OF_SERVICE: {
				TITLE: 'Terms of Service',
				URI: '/terms',
				CONTENT: {
					WELCOME: 'Last Updated: 22 November 2018',
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
			},
			COOKIES_POLICY: {
				TITLE: 'Cookies Policy',
				URI: '/cookies-policy',
				CONTENT: {
					WELCOME: '',
					CONSENT: 'Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site. By continuing to browse our site, you agree to the use of these cookies.',
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
			},
			END_USER_LICENSE_AGREEMENT: {
				TITLE: 'End User License Agreement',
				URI: '/eula',
				CONTENT: {
					WELCOME: '',
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
			},
			HELP: {
				URL: 'https://help.checkin.nccsoft.vn',
			},
			NEWS: {
				TITLE: 'News',
				URI: '/news',
				CONTENT: {
					WELCOME: '',
					ARTICLES: [
						{
							TITLE: '<div class="p-0 m-0 text-center"><img src="/assets/img/erdf.png" alt="European Regional Development Fund Support" class="img-fluid d-block ml-auto mr-auto mb-4" style="height: 200px;" />European Regional Development Fund Support</div>',
							URI: '/news/european-regional-development-fund-support',
							CONTENT: '<p>NCC ASIA</p>',
							META: {
								DESCRIPTION: '',
								KEYWORDS: '',
							},
						},
					],
				},
				META: {
					DESCRIPTION: '',
					KEYWORDS: '',
				},
			},
		},
		NOTIFICATIONS: {
			TIMEOUT: 3000,
		},
		TRACKING: {
			GOOGLE: 'GTM-N8KDBWL',
			INTERCOM: {
				DEV: 'dcg5oqr4',
				PROD: 'zg6c3c0t',
			},
		},
	},
	API: {
		HOST: {
			DEV: 'http://localhost:8000/v1',
			PROD: 'https://checkin.nccsoft.vn/v1',
		},
	},
};

export default mainConfig;
