import React from "react";
import {usePage, Head, Link, router, useForm} from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";


export default function Index(props) {

    const {doctors} = usePage().props;

    const {data,setData,get} = useForm({
        term:''
    })

    function destroy(e) {
        if (confirm("آیا از حذف این مورد مطمئن هستید؟")) {
            router.delete(route("admin.doctors.destroy", e.currentTarget.id));
        }
    }


    function restore(e) {
        if (confirm("آیا از برگرداندن این مورد مطمئن هستید؟")) {
            router.get(route("admin.doctors.restore", e.currentTarget.id));
        }
    }

    function handleSearch(e) {
        e.preventDefault()
        get(route("admin.doctors.index"))
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl leading-tight">پزشکان</h2>}
        >

            <Head title="Doctors"/>

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm ">
                        <div className="p-3 bg-white dark:bg-gray-800 dark:shadow-xl">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-900 rounded-md focus:outline-none hover:bg-blue-800 duration-300"
                                    href={route("admin.doctors.create")}
                                >
                                    ایجاد پزشک
                                </Link>
                                <form method="GET" onSubmit={handleSearch}>
                                    <input type={"text"} className={"rounded"} placeholder={"جست و جو کنید..."} value={data.term} onChange={(e)=>{
                                        setData("term",e.target.value)
                                    }}/>
                                    <button type={"submit"}
                                            className={"rounded-lg px-6 py-2 focus:outline bg-yellow-300 mr-3 hover:bg-yellow-200 duration-300"}>جست
                                        و جو
                                    </button>
                                </form>
                            </div>

                            <table className="w-full dark:bg-gray-800 table-auto text-xs">
                                <thead>
                                <tr className="bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <th className="px-4 py-2 w-20">ردیف</th>
                                    <th className="px-4 py-2 w-20">عکس</th>
                                    <th className="px-4 py-2">نام و نام خانوادگی</th>
                                    <th className="px-4 py-2">جنسیت</th>
                                    <th className="px-4 py-2">کد ملی</th>
                                    <th className="px-4 py-2">ایمیل</th>
                                    <th className="px-4 py-2">شماره همراه</th>
                                    <th className="px-4 py-2">تخصص</th>
                                    <th className="px-4 py-2">آدرس</th>
                                    <th className="px-4 py-2">عملیات</th>
                                </tr>
                                </thead>
                                <tbody>
                                {doctors.data.map(({
                                                       id,
                                                       first_name,
                                                       last_name,
                                                       gender,
                                                       national_code,
                                                       mobile,
                                                       email,
                                                       specialization,
                                                       photo_path,
                                                       address,
                                                       deleted_at
                                                   }) => (
                                    <tr key={id} className="border dark:border-gray-700 dark:text-gray-300">
                                        <td className="px-4 py-2">{id}</td>
                                        <td className="px-4 py-2"><img
                                            src={window.location.origin + '/app/' + photo_path} alt=""/></td>
                                        <td className="px-4 py-2">{first_name + ' ' + last_name}</td>
                                        <td className="px-4 py-2">{gender == 1 ? 'مرد' : 'زن'}</td>
                                        <td className="px-4 py-2">{national_code}</td>
                                        <td className="px-4 py-2">{email}</td>
                                        <td className="px-4 py-2">{mobile}</td>
                                        <td className="px-4 py-2">{specialization}</td>
                                        <td className="px-4 py-2">{address}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex flex-row">
                                                <Link
                                                    tabIndex="1"
                                                    className="px-4 py-2 text-sm text-white bg-blue-500 dark:bg-blue-700 rounded"
                                                    href={route("admin.doctors.edit", id)}
                                                >
                                                    ویرایش
                                                </Link>

                                                <button
                                                    onClick={deleted_at == null ? destroy : restore}
                                                    id={id}
                                                    tabIndex="-1"
                                                    type="button"
                                                    className={`${deleted_at == null ? 'bg-red-500 dark:bg-red-700' : 'bg-green-500 dark:bg-green-700'} mx-1 px-4 py-2 text-sm text-white rounded`}
                                                >
                                                    {deleted_at == null ? "حذف" : "برگرداندن"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                                {doctors.data.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-6 py-4 border-t dark:text-white text-center"
                                            colSpan="11"
                                        >
                                            هیچ موردی یافت نشد.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <Pagination links={doctors.links} class="mt-5"/>
                        </div>
                    </div>
                </div>
            </div>


        </Authenticated>
    );
}
