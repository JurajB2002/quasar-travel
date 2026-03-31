const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
        {path: '',
        component: () => import('pages/HomePage.vue')
        },
        {path: 'add',
        component: () => import('pages/AddLocationPage.vue')
        },
        {path: 'details/:id',
        component: () => import('pages/LocationDetails.vue')
        }
      ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
