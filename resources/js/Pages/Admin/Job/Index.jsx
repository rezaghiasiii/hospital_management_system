import React from 'react';
import {Head, Link, usePage, router} from "@inertiajs/react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";

const Index = (props) => {

    const {jobs} = usePage().props;

    function destroy(e) {
        if (confirm("آیا از حذف این مورد مطمئن هستید؟")) {
            router.delete(route("admin.jobs.destroy", e.currentTarget.id));
        }
    }


    function restore(e) {
        if (confirm("آیا از برگرداندن این مورد مطمئن هستید؟")) {
            router.get(route("admin.jobs.restore", e.currentTarget.id));
        }
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl leading-tight">شغل ها</h2>}
        >

            <Head title="Jobs"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm ">
                        <div className="p-6 bg-white dark:bg-gray-800 dark:shadow-xl">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-gray-300 bg-blue-900 rounded-md focus:outline-none"
                                    href={route("admin.jobs.create")}
                                >
                                    ایجاد شغل
                                </Link>
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
                                        عملیات
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                {jobs.data.map(({id, name, deleted_at}) => (
                                    <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link
                                                tabIndex="1"
                                                className="px-4 py-2 text-sm text-gray-300 bg-blue-700 rounded"
                                                href={route("admin.jobs.edit", id)}
                                            >
                                                ویرایش
                                            </Link>
                                            <button
                                                onClick={deleted_at == null ? destroy : restore}
                                                id={id}
                                                tabIndex="-1"
                                                type="button"
                                                className={`${deleted_at == null ? 'bg-red-700' : 'bg-green-700'} mx-1 px-4 py-2 text-sm text-gray-300 rounded`}
                                            >
                                                {deleted_at == null ? "حذف" : "برگرداندن"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {jobs.data.length === 0 && (
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
                            <Pagination links={jobs.links} class="mt-5"/>
                        </div>
                    </div>
                </div>
            </div>


        </Authenticated>
    );
};

export default Index;