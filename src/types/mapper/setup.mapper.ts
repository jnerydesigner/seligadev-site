import {
  SetupPageDirectusType,
  SetupItem as SetupPageDirectusItem,
} from "../setup_page_directus.type";
import { SetupItemDataType, SetupItem } from "../setup_item.type";

export class SetupMapper {
  static toResponse(setup: SetupPageDirectusType): SetupItemDataType {
    return {
      id: setup.id,
      slug: setup.slug,
      title: setup.title,
      setup_items: setup.setup_items.map(SetupMapper.toItem),
    };
  }

  private static toItem(item: SetupPageDirectusItem): SetupItem {
    return {
      id: item.setup_items_id.id,
      name: item.setup_items_id.name,
      price: item.setup_items_id.price,
      productUrl: item.setup_items_id.productUrl,
      imageUrl: item.setup_items_id.imageUrl,
      slug: item.setup_items_id.slug,
      nameFull: item.setup_items_id.nameFull,
    };
  }
}
