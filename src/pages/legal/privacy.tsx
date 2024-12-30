export default () => {
    return (
        <div id="scrollspy-scrollable-parent" className="vertical-scrollbar max-h-96">
            <div className="grid grid-cols-5">
                <div className="col-span-2 sm:col-span-1">
                    <ul className="sticky top-0 text-sm leading-6" data-scrollspy="#scrollspy" data-scrollspy-scrollable-parent="#scrollspy-scrollable-parent">
                        <li className="text-base-content/90 text-xl font-medium">Index</li>
                        <li data-scrollspy-group="">
                            <a href="#chapter-1" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-primary active block py-0.5 font-medium">
                                Chapter 1
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#chapter-1-1" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-primary flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        Chapter 1-1
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#chapter-1-2" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-primary flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        Chapter 1-2
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#chapter-2" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-primary block py-0.5 font-medium">
                                Chapter 2
                            </a>
                        </li>
                        <li data-scrollspy-group="">
                            <a href="#chapter-3" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-primary block py-0.5 font-medium">
                                Chapter 3
                            </a>
                            <ul>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#chapter-3-1" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-primary flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        Chapter 3-1
                                    </a>
                                </li>
                                <li className="ms-0.5 sm:ms-4">
                                    <a href="#chapter-3-2" className="text-base-content/80 hover:text-base-content/90 scrollspy-active:text-primary flex items-center gap-x-2 py-0.5">
                                        <span className="icon-[tabler--point] size-4"></span>
                                        Chapter 3-2
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="col-span-3 sm:col-span-4">
                    <div id="scrollspy" className="space-y-4 pe-1">
                        <div id="chapter-1">
                            <p className="text-base-content/90 text-lg font-semibold">Chapter 1</p>
                            <p className="mt-1 text-sm leading-6">
                                This placeholder content serves to demonstrate the functionality of the scrollspy page. As you scroll down,
                                the corresponding navigation link is highlighted to indicate the active section. This example copy is
                                continuously added to underscore the scrolling and highlighting feature.
                            </p>
                        </div>
                        <div id="chapter-1-1">
                            <p className="text-base-content/90 text-lg font-semibold">Chapter 1-1</p>
                            <p className="mt-1 text-sm leading-6">
                                This placeholder content serves to demonstrate the functionality of the scrollspy page. As you scroll down,
                                the corresponding navigation link is highlighted to indicate the active section. This example copy is
                                continuously added to underscore the scrolling and highlighting feature.
                            </p>
                        </div>
                        <div id="chapter-1-2">
                            <p className="text-base-content/90 text-lg font-semibold">Chapter 1-2</p>
                            <p className="mt-1 text-sm leading-6">
                                This placeholder content serves to demonstrate the functionality of the scrollspy page. As you scroll down,
                                the corresponding navigation link is highlighted to indicate the active section. This example copy is
                                continuously added to underscore the scrolling and highlighting feature.
                            </p>
                        </div>
                        <div id="chapter-2">
                            <p className="text-base-content/90 text-lg font-semibold">Chapter 2</p>
                            <p className="mt-1 text-sm leading-6">
                                This placeholder content serves to demonstrate the functionality of the scrollspy page. As you scroll down,
                                the corresponding navigation link is highlighted to indicate the active section. This example copy is
                                continuously added to underscore the scrolling and highlighting feature.
                            </p>
                        </div>
                        <div id="chapter-3">
                            <p className="text-base-content/90 text-lg font-semibold">Chapter 3</p>
                            <p className="mt-1 text-sm leading-6">
                                This placeholder content serves to demonstrate the functionality of the scrollspy page. As you scroll down,
                                the corresponding navigation link is highlighted to indicate the active section. This example copy is
                                continuously added to underscore the scrolling and highlighting feature.
                            </p>
                        </div>
                        <div id="chapter-3-1">
                            <p className="text-base-content/90 text-lg font-semibold">Chapter 3-1</p>
                            <p className="mt-1 text-sm leading-6">
                                This placeholder content serves to demonstrate the functionality of the scrollspy page. As you scroll down,
                                the corresponding navigation link is highlighted to indicate the active section. This example copy is
                                continuously added to underscore the scrolling and highlighting feature.
                            </p>
                        </div>
                        <div id="chapter-3-2">
                            <p className="text-base-content/90 text-lg font-semibold">Chapter 3-2</p>
                            <p className="mt-1 text-sm leading-6">
                                This placeholder content serves to demonstrate the functionality of the scrollspy page. As you scroll down,
                                the corresponding navigation link is highlighted to indicate the active section. This example copy is
                                continuously added to underscore the scrolling and highlighting feature.
                            </p>
                        </div>
                        <div className="h-[16.5rem]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}