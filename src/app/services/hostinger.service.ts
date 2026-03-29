import { HostingerDataType } from "@/types/hostinger-data.type";
import { HostingerDirectusType } from "@/types/hostinger_directus_type";

export function getHostingerData(data: HostingerDirectusType): HostingerDataType {
    return {
        id: data.id,
        user_created: data.user_created,
        date_created: data.date_created,
        user_updated: data.user_updated,
        date_updated: data.date_updated,
        title: data.title,
        priceOriginalTotal: data.priceOriginalTotal,
        price: data.price,
        priceAndDiscount: data.priceAndDiscount,
        link: data.link,
        hostingerDescription: (data.hostinger_description ?? []).map((item) => ({
            id: item.HostingerDescription_id?.id ?? item.id,
            line: item.HostingerDescription_id?.line ?? "",
        })),
        hostingerDiscountDdescription: (data.hostinger_discount_description ?? []).map((item) => ({
            id: item.HostingerDiscountDescription_id?.id ?? item.id,
            line: item.HostingerDiscountDescription_id?.line ?? "",
        })),
    };
}
