import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import CreateGoalDialog from '@/components/createGoalDialog/CreateGoalDialog';

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

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">2024 Goals</h1>
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
          <div
            key={el.status}
            className="border border-[#dfdfdf] rounded p-3 flex flex-col items-center justify-center"
          >
            <span className="text-2xl font-bold">{el.count}</span>
            <span className="text-xs text-gray-500">{el.status}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>

        <div className="border border-[#dfdfdf] rounded flex items-center px-4 py-3">
          <div>
            <h3 className="text-base font-medium">Master Next.js</h3>
            <p className="mt-1 text-xs text-yellow-500">Pending</p>
            <p className="mt-2 text-xs line-clamp-2 text-gray-500">Started with App Router</p>
          </div>
        </div>
      </div>
    </div>
  );
}
