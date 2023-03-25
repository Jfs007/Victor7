
import { vic, getContext } from ".";

let Route = (PageOptions = {}) => {
    if (!vic.__scope.Page) {
        throw new Error('使用Route需要提前申请Page作用域, 调用vic.applyScope("Page", Page)')
    }
    Page = vic.__scope.Page;

    let navigate = vic.navigate;

    let { onShow, onUnload, onRoute, onBack } = PageOptions;

    let ctx = null;

    let callback = () => { };

    let isCallback = false;

    let on = (payload) => {
        // 如果navigate派送事件的时候当前页面还未生产，使用callback装载

        if (!ctx) {
            // 装载的派送事件会在当前页面生成后(onShow)执行
            callback = () => {
                onRoute && onRoute.call(ctx, payload);
            }
            return;
        }
        if (payload.to.route != ctx.route) {
            return;
        };

        if (!isCallback) {
            callback = () => { };
            onRoute && onRoute.call(ctx, payload)
        };
    }
    navigate.onRoute(on);

    PageOptions.onShow = function () {
        // 如果页面是首次进入的，则主动派送onRoute事件
        if (!navigate.history.length) {
            let _this = getContext();
            navigate.history.push(_this);
            let payload = {
                from: {},
                to: _this
            };
            navigate.emitRoute(payload);
            onRoute && onRoute.call(this, payload);
            // 标记已经派送事件
            isCallback = true;
            ctx = this;
        } else {
            // 将装载的派送事件执行掉。
            ctx = this;
            callback();
            isCallback = true;

        }
        onShow && onShow.call(this);
    }


    PageOptions.onUnload = function () {
        onUnload && onUnload.call(this);
        onBack && onBack();
    }




    return Page(PageOptions);
}

const scope = {
    Route
}


class RouteBehavior {
    constructor() {

    }
}



function registerRouteBehavior() {

}

export default scope;