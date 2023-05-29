import React from 'react';
import {Head, Link, usePage, router, useForm} from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

const Index = (props) => {

    const {medicines} = usePage().props;

    const {data,setData,get} = useForm({
        term:''
    })

    function destroy(e) {
        if (confirm("آیا از حذف این مورد مطمئن هستید؟")) {
            router.delete(route("admin.medicines.destroy", e.currentTarget.id));
        }
    }


    function restore(e) {
        if (confirm("آیا از برگرداندن این مورد مطمئن هستید؟")) {
            router.get(route("admin.medicines.restore", e.currentTarget.id));
        }
    }

    function handleSearch(e) {
        e.preventDefault()
        get(route("admin.medicines.index"))
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl leading-tight">دارو ها</h2>}
        >

            <Head title="Medicines"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm ">
                        <div className="p-6 bg-white dark:bg-gray-800 dark:shadow-xl">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-900 rounded-md focus:outline-none"
                                    href={route("admin.medicines.create")}
                                >
                                    ایجاد دارو
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
                            <table className="w-full text-right text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead
                                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ردیف
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        عنوان
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        قیمت
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        کد
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        عملیات
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {medicines.data.map(({id, title, price, code, deleted_at}) => (
                                    <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {title}
                                        </td>
                                        <td className="px-6 py-4">
                                            {price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {code}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                tabIndex="1"
                                                className="px-4 py-2 text-sm text-white bg-blue-500 dark:bg-blue-700 rounded"
                                                href={route("admin.medicines.edit", id)}
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
                                        </td>
                                    </tr>
                                ))}
                                {medicines.data.length === 0 && (
                                    <tr>
                                        <td
                                            className="px-6 py-4 border-t"
                                            colSpan="4"
                                        >
                                            هیچ موردی یافت نشد.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                            <Pagination links={medicines.links} class="mt-5"/>
                        </div>
                    </div>
                </div>
            </div>


        </Authenticated>
    );
};

export default Index;
