const unauthenticatedPaths = {
  authentication: '/authentication/',
  signUp: '/authentication/sign-up',
  signIn: '/authentication/sign-in',
  resetPassword: '/authentication/reset-password',
  resetEmail: '/authentication/reset-email',
  verifyEmail: '/authentication/verify-email',
  updatePassword: '/authentication/update-password',
  docs: '/docs',
  certificates: {
    root: '/certificates',
    share: '/certificates/share/:hash',
    shareView: '/certificates/share/:hash?/view',
    receive: '/certificates/receive/:id',
  },
  support: (name: string, email?: string) =>
    `https://api.whatsapp.com/send?phone=5551992800702&text=Ol%C3%A1%20me%20chamo%20${name}/${email},%20preciso%20de%20suporte%20em%20rela%C3%A7%C3%A3o%20a%20%22sua%20d%C3%BAvida%22`,
};

const authenticatedPaths = {
  dashboard: '/',
  certificates: {
    root: '/certificates',
    create: '/certificates/create',
    list: '/certificates/list',
    view: '/certificates/view/:id',
    share: '/certificates/share/:hash',
    shareView: '/certificates/share/:hash?/view',
    receive: '/certificates/receive/:id',
  },
  learningTrails: {
    root: '/learningTrails',
    details: '/learningTrails/details/:id',
    course: '/learningTrails/course/:id',
    all: '/learningTrails/all',
  },
  leveling: {
    root: '/leveling',
    ranking: '/leveling/ranking',
    achievements: '/leveling/achievements',
    achievementdetail: '/leveling/achievements/:id/detail',
    achievementshare: '/leveling/achievements/:id/share',
    points: '/leveling/points',
    missions: '/leveling/missions',
    missiondetail: '/leveling/missions/detail/:id',
    missionshare: '/leveling/missions/detail/:id/share',
  },
  account: {
    root: '/account',
    profile: '/account/profile',
    plans: '/account/plans',
    cards: '/account/cards',
    uploadDocument: '/account/upload-document',
  },
  settings: {
    root: '/settings',
  },
  resume: {
    root: '/resumes',
    create: '/resumes/create',
    edit: '/resumes/edit/:resumeId',
  },
  professionalProfile: '/professional-profile',
  pdi: {
    root: '/pdi',
    create: '/pdi/create',
    graph: '/pdi/graph/:id',
  },
  admin: {
    dashboard: '/admin',
    backgroundImage: '/admin/template/internalImages',
    users: {
      root: '/admin/users',
      view: '/admin/users/:id',
    },
    schools: {
      root: '/admin/schools',
      view: '/admin/schools/:id',
    },
    certificates: {
      root: '/admin/certificates',
      view: '/admin/certificates/:id',
    },
    plans: {
      root: '/admin/plans',
      view: '/admin/plans/:id',
      create: '/admin/plans/create',
      edit: '/admin/plans/edit/:id',
    },
    emails: {
      root: '/admin/emails',
      create: '/admin/emails/create',
      edit: '/admin/emails/edit/:id',
    },
    abilities: {
      root: '/admin/abilities',
      create: '/admin/abilities/create',
      edit: '/admin/abilities/edit/:id',
    },
    pdi: {
      train: '/admin/pdi/train',
    },
    compliance: '/compliance',
    reports: '/reports',
  },
  legalPerson: {
    dashboard: '/',
    profile: '/profile',
    reports: '/reports',
    users: {
      root: '/users',
      view: '/users/:id',
      create: '/users/create',
      edit: '/users/edit/:id',
    },
    canvas: '/canvas',
  },
  corporatePerson: {
    dashboard: '/',
    create: '/jobs/create',
    view: '/jobs/view/:jobId',
    candidate: '/jobs/view/:jobId/:userId',
  },
  naturalPerson: {
    dashboard: '/',
    levelingPJ: {
      root: '/levelingPJ',
      missionDetail: '/levelingPJ/missionDetail/:id',
      achievementDetail: '/levelingPJ/achievementDetail/:id',
      createAchievement: '/levelingPJ/createAchievement',
      createMission: '/levelingPJ/createMission',
    },
    school: {
      root: '/schools',
      view: '/schools/:id',
      create: '/schools/create',
      edit: '/schools/edit/:id',
      courses: {
        list: '/schools/:id/courses',
        create: '/schools/:id/courses/create',
        edit: '/schools/:id/courses/edit/:courseId',
      },
      students: {
        root: '/schools/:id/students',
        view: '/schools/:id/students/:id',
        create: '/schools/:id/students/create',
        edit: '/schools/:id/students/edit/:id',
      },
    },
    student: {
      root: '/students',
      view: '/students/:id',
      create: '/students/create',
      unitaryCreate: '/students/create/unitary',
      bulkCreate: '/students/create/bulk',
      edit: '/students/edit/:id',
    },
    course: {
      root: '/courses',
      view: '/courses/:id',
      edit: '/courses/edit/:id',
      curriculum: {
        create: '/courses/:id/curriculum',
        edit: '/courses/curriculum/edit/:id',
      },
    },
    trail: {
      root: '/trails',
      create: '/trails/create',
      view: '/trails/:id',
      edit: '/trails/edit/:id',
    },
    certificates: {
      root: '/certificates',
      create: '/certificates/create',
      list: '/certificates/list',
      view: '/certificates/view/:id',
      share: '/certificates/share/:hash',
      shareView: '/certificates/share/:hash?/view',
      receive: '/certificates/receive/:id',
    },
    reports: '/reports',
    history: {
      certificates: {
        list: '/history/emission',
        view: '/history/emission/:id',
      },
      compliance: '/compliance',
    },
    template: {
      root: '/certificates/templates',
      view: '/certificates/templates/view/:id',
      edit: '/certificates/template/edit/:id',
      backgroundImage: '/certificates/template/internalImages',
    },
    profile: '/profile',
  },
  canvas: {
    dashboard: '/',
    students: '/students',
    auth: '/canvas/auth',
    certificates: {
      root: '/certificates',
      create: '/certificates/create',
      list: '/certificates/list',
      view: '/certificates/view/:id',
    },
    template: {
      root: '/certificates/templates',
      view: '/certificates/templates/view/:id',
      edit: '/certificates/template/edit/:id',
      backgroundImage: '/certificates/template/internalImages',
    },
  },
};

export const pagePaths = {
  unauthenticated: unauthenticatedPaths,
  authenticated: authenticatedPaths,
};
