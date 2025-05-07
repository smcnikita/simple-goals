import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CreateGoalDialog from '@/components/create-goal-dialog/CreateGoalDialog';
import GoalItem from '@/components/GoalItem';

const data = [
  {
    count: 7,
    status: 'Total',
  },
  {
    count: 2,
    status: 'In Progress',
  },
  {
    count: 3,
    status: 'Completed',
  },
  {
    count: 1,
    status: 'Not Completed',
  },
  {
    count: 1,
    status: 'Canceled',
  },
];

const goals = [
  {
    name: 'Изучить TypeScript',
    description: 'Пройти курс по TypeScript и выполнить все практические задания.',
    status: 'In Progress',
  },
  {
    name: 'Написать блог-пост',
    description: 'Создать статью о лучших практиках программирования на JavaScript.',
    status: 'Not Completed',
  },
  {
    name: 'Завершить проект',
    description: 'Закончить разработку веб-приложения для управления задачами.',
    status: 'In Progress',
  },
  {
    name: 'Прочитать книгу',
    description: 'Прочитать книгу "Clean Code" от Роберта Мартина.',
    status: 'Completed',
  },
  {
    name: 'Участвовать в хакатоне',
    description: 'Принять участие в хакатоне по разработке мобильных приложений.',
    status: 'Canceled',
  },
  {
    name: 'Изучить React',
    description: 'Пройти курс по React и создать простое приложение.',
    status: 'Not Completed',
  },
  {
    name: 'Посетить конференцию',
    description: 'Посетить конференцию по веб-разработке в этом году.',
    status: 'In Progress',
  },
  {
    name: 'Сделать перерыв',
    description: 'Выделить время на отдых и восстановление.',
    status: 'Completed',
  },
  {
    name: 'Научиться работать с Git',
    description: 'Изучить основы работы с системой контроля версий Git.',
    status: 'Not Completed',
  },
  {
    name: 'Создать портфолио',
    description: 'Собрать и оформить портфолио своих проектов.',
    status: 'In Progress',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">2025 Goals</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage your goals for 2024</p>
        </div>

        <div className="flex items-center gap-3">
          <Select defaultValue="Total">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Statuses</SelectLabel>
                {data.map((el) => (
                  <SelectItem key={el.status} value={el.status}>
                    {el.status === 'Total' ? 'All goals' : el.status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <CreateGoalDialog />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {data.map((el) => (
          <div key={el.status} className="border border-gray-200 rounded p-3 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{el.count}</span>
            <span className="text-xs text-gray-500">{el.status}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {goals.length > 0 &&
          goals.map((el) => (
            <GoalItem key={el.name} status={el.status} description={el.description}>
              {el.name}
            </GoalItem>
          ))}
      </div>
    </div>
  );
}
