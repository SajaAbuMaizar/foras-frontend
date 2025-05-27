
import JobForm from './components/JobForm';
import { fetchCities, fetchFields } from '@/lib/api';

export default async function postJobPage() {
  const cities = await fetchCities();
  const fields = await fetchFields();
  
  return (
        <div className="flex flex-col items-stretch w-full mr-[30px] mt-20 pb-0 min-h-[1px]">
      <h1 className="text-xl font-semibold px-5 py-4">
        طلب وظيفي
      </h1>
      <div className="px-[1.625rem] w-full">
        <div className="-mx-[0.8125rem] flex flex-wrap">
          <div className="w-full max-w-full px-[0.8125rem] xl:flex-1 min-h-[1px]">
            <div className="bg-white shadow-md rounded-md mb-6 mx-[30px]">
              <div className="p-6">
                <JobForm cities={cities} fields={fields} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}