'use client'
import UserAnalytics from '../../../app/components/Admin/Analytics/UserAnalytics';
import DashboardHeader from '../../components/Admin/DashboardHeader';
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from '../../utils/Heading';

type Props = {}

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="CourseFlow - Admin"
        description="CourseFlow is a platform for students to learn and get help from teachers"
        keywords="Programming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <UserAnalytics />
        </div>
      </div>
    </div>
  )
}

export default page