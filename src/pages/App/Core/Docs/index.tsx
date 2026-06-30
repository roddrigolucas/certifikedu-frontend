import { Helmet } from 'react-helmet';
import { FcDownload } from 'react-icons/fc';

import { Logo } from '@/components/core/atoms/Logo';

const documentationLinks = [
  {
    title: 'Introdução',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/NmViNWM5MWQyNTFiNGNhOTlmMzU3Y2E2MjBkNWU0NmU',
  },
  {
    title: 'Autenticação',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/NWEwNmYyYjJjYTU5NGU3N2I3ZGYwZWY0MmY5OWZlYzM',
  },
  {
    title: 'Instituições de Ensino',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/YjAwMWQyZmVmMTQyNGU0YWFjNDQ1NmE4MzRiMzE5MjA',
  },
  {
    title: 'Estudantes',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/NDVjNjE4ODA5NGY1NGM3YTg0ZTVkMmEwZjUzZTljZWY',
  },
  {
    title: 'Certificados',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/Mzc3NWQxNTE0YTIwNGM2M2FlMmQxZDk1NDhmODRmOTM',
  },
  {
    title: 'Habilidades',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/ZDg0ODA3MmRlMWMxNGQ0NGI1MWY5YTQyYTNhYmE2M2U',
  },
  {
    title: 'Template Certificado',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/YmJlYjEwNmQ1MGMzNDFhNmE2ZWQzZDA1MTIwODUwNWM',
  },
  {
    title: 'Cursos',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/MzU4OTg3OTdkZDQ2NDQxYmE2MWNlODIyOWEyMDhjMTI',
  },
  {
    title: 'Currículos',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/YWJiZWFlNTFiNWVhNGVkMmI1ZDJlZjQ3ZTNmMjQwODY',
  },
  {
    title: 'Semestres',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/MGZlMWI2OGQ0ODA1NDYxNWFmZWZhNmI3ZDhhYmYwNGQ',
  },
  {
    title: 'Atividades',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/MGZjNWQ2NzIyNDM4NDVmNmI3Y2MxM2MyYTUwZDc0ZGE',
  },
  {
    title: 'Estágios',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/NTY2ODZhZDg4MDY3NDlmMjkzNjVhYmQ3OWE3OGExMzE',
  },
  {
    title: 'Disciplinas',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/YTkxZTE3YjFlMDNlNDE4ZGE3NWEyNzIxNTlmM2FmOWM',
  },
  {
    title: 'Campos de estudo',
    link: 'https://doc-certifikedu.atlassian.net/wiki/external/YzBmYjJlNjA5ODk2NDE4MjlkYzc5MDE2NmI0NGI0ZTk',
  },
];

const DocumentationCard = () => {
  return (
    <>
      <Helmet>
        <title>Documentação da API • CertifikEDU</title>
        {/* {description && <meta name="description" content={description} />} */}
      </Helmet>
      <div className="mt-10 flex flex-col items-center justify-center p-4 lg:p-0 ">
        <div className="flex  w-full items-center p-4  ">
          <Logo path={'images/logo_text.svg'} />
        </div>
        <div className="w-full max-w-screen-lg overflow-hidden rounded-lg bg-blue-zodiac-800/20 shadow-lg ">
          <h2 className="mb-2 mt-5 text-center text-2xl font-bold text-white">
            Bem vindo à Documentação da CertifikEDU
          </h2>
          <div className="px-6 py-4">
            <p className="text-md mb-2 text-center font-bold text-white">
              Aqui você encontra todos os links necessários para se conectar aos nossos serviços
            </p>
            <span className="mb-2  mt-4 text-left text-xs font-bold text-white">
              Última atualização dos arquivos: 19/03/2024
            </span>

            <div className=" text-base">
              {documentationLinks.map((item) => (
                <a
                  href={item.link}
                  key={item.link}
                  className="mt-4 block rounded bg-orange-200 px-4 py-2 text-orange-700 hover:bg-orange-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>
              ))}
              <a
                href="https://app.swaggerhub.com/apis-docs/LUIZGUARINELLO/certifikEdu_api/1.0.0#/"
                className="mt-4 block rounded bg-blue-200 px-4 py-2 text-blue-700 hover:bg-blue-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                Acessar Swagger
              </a>
              <div className="flex flex-row">
                <a
                  href="/certifikedu_apis.yaml"
                  download="certifikedu_apis.yaml"
                  className="mx-auto mt-4 block rounded bg-emerald-200 px-4 py-2 text-emerald-700 hover:bg-emerald-300"
                >
                  Baixar Postman Collection
                  <FcDownload size={18} className="mx-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentationCard;
