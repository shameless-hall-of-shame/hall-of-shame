import Collapse from 'components/Collapse';
import Icon, {IconType} from 'components/Icon';
import {getAllPersonsIds, getPerson, PersonInfo} from 'lib/api/persons';
import type {GetStaticPaths, GetStaticProps, NextPage} from 'next';

type PersonDetailPageProps = {
  personInfo: PersonInfo;
};

const PersonDetailPage: NextPage<PersonDetailPageProps> = ({personInfo}) => {
  const {
    avatarUrl,
    login,
    name,
    email,
    company,
    location,
    eventsCount,
    issuesCount,
    issues,
    bio,
    twitterUsername,
    websiteUrl,
  } = personInfo;

  const details = [
    {
      icon: 'note' as IconType,
      value: bio,
    },
    {
      icon: 'email' as IconType,
      value: email,
    },
    {
      icon: 'location' as IconType,
      value: location,
    },
    {
      icon: 'company' as IconType,
      value: company,
    },
    {
      icon: 'twitter' as IconType,
      value: twitterUsername ? `@${twitterUsername}` : null,
    },
    {
      icon: 'link' as IconType,
      value: websiteUrl,
    },
  ].filter((detailItem) => Boolean(detailItem.value));

  return (
    <div className="md:container mx-auto p-4 md:flex">
      <aside className="md:pt-10  md:w-72 flex-shrink-0 flex-grow-0 overflow-hidden">
        <div className="flex items-center md:block bg-white p-4 md:p-8 rounded-lg shadow-sm w-full">
          <header className="flex-shrink-0 text-center">
            <img
              className="inline-block w-16 h-16 md:w-48 md:h-48 md:-mt-14 rounded-full ring md:ring-4 md:ring-offset-2"
              src={avatarUrl}
              alt=""
            />
            <h1 className="mt-2">
              <span className="block md:text-xl">{name}</span>
              <span className="block text-sm md:text-base text-gray-600">
                {login}
              </span>
            </h1>
          </header>
          <div className="md:mt-3 flex-1 ml-4 md:ml-0">
            <div className="md:mt-2">
              <dl className="flex divide-x">
                <div className="flex-1 flex items-center justify-between p-2 pl-0">
                  <dt className="text-sm text-gray-500">参与事件</dt>
                  <dd className="text-gray-700">{eventsCount}</dd>
                </div>
                <div className="flex-1 flex items-center justify-between p-2">
                  <dt className="text-sm text-gray-500">发言</dt>
                  <dd className="text-gray-700">{issuesCount}</dd>
                </div>
              </dl>
            </div>
            {details.length > 0 && (
              <ul className="list-none space-y-1 mt-2">
                {details.map(({icon, value}) => (
                  <li className="text-gray-600 text-sm" key={icon}>
                    <Icon
                      className="inline fill-gray-600  h-3 w-3"
                      type={icon}
                    />
                    <span className="ml-1 break-all">{value}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2">
              <a
                href={`https://github.com/${login}`}
                target="_blank"
                rel="noreferrer noopener"
                className="block text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-5 w-full">
                Github 页
              </a>
            </div>
          </div>
        </div>
      </aside>

      <div className="pt-4 md:ml-4 md:pt-10 flex-1">
        <ul className="list-none bg-white p-4 md:p-8 rounded-lg shadow-sm space-y-2">
          {issues.map(({id, title, bodyHtml, createdAt, url}) => (
            <li key={id} className="rounded-lg p-2 md:p-4 border">
              <Collapse
                title={
                  <h1 className="text-sm break-all md:text-base">{title}</h1>
                }>
                <div className="p-4">
                  <header className="flex items-center py-2 text-xs md:text-sm ">
                    <time className="text-gray-600">{createdAt}</time>
                    <a
                      href={url}
                      target="_blank"
                      className="block ml-3 text-sky-500"
                      rel="noreferrer noopener">
                      在 Github 中查看
                    </a>
                  </header>
                  <article
                    className="text-gray-600 text-sm md:text-base"
                    dangerouslySetInnerHTML={{
                      __html: bodyHtml || '',
                    }}></article>
                </div>
              </Collapse>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonDetailPage;

export const getStaticProps: GetStaticProps = (props) => {
  const personInfo = getPerson(props?.params?.id as string);
  return {
    props: {
      personInfo,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const allPersonsIds = getAllPersonsIds();
  console.log(allPersonsIds);
  return {
    paths: allPersonsIds.map((id) => `/persons/${id}`),
    fallback: false,
  };
};
