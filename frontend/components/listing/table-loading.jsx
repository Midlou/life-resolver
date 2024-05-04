import React from "react";
import _ from "lodash";

import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";

const TableLoading = () => {
    return <tbody>
        <tr>
            <td className="text-gray-400 border">
                <div className="flex items-center justify-center">
                    <EllipsisHorizontalIcon className="animate-pulse w-20 h-20"/>
                </div>
            </td>
        </tr>
    </tbody>
}

export default TableLoading;
