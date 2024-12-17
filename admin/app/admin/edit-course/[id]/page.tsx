'use client'
import DashboardHeader from '../../../../app/components/Admin/DashboardHeader';
import Heading from '../../../../app/utils/Heading';
import EditCourse from "../../../components/Admin/Course/EditCourse";
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";

type Props = {}

const page = ({ params }: any) => {
  const id = params?.id;

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
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  )
}

export default page