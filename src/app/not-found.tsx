import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-terminal-bg text-green p-4 min-h-fit">
      <div className="text-left max-w-2xl w-full">
        <pre className="text-red text-xs sm:text-sm mb-4 whitespace-pre-wrap overflow-x-auto">
          {`Segmentation fault (core dumped)
Program terminated with signal 11, Segmentation fault.
#0  0x00007fff8b2a6000 in ?? ()
Stack trace:
    at webpage.load() [0x404]
    at router.navigate() [0x7ff4]
    at main() [0x0000]

Fatal error: Attempted to access memory at invalid address 0x404`}
        </pre>

        <div className="border-l-4 border-red pl-4 mb-6">
          <h1 className="text-red text-lg sm:text-xl font-bold mb-2">
            KERNEL PANIC: Page Not Found
          </h1>
          <p className="text-gray mb-2 text-sm sm:text-base">
            Process 'webpage' has encountered an unrecoverable error
          </p>
          <p className="text-gray text-xs sm:text-sm">
            Error code: HTTP_404_NOT_FOUND
          </p>
        </div>

        <div className="bg-black border border-gray p-3 sm:p-4 mb-6 overflow-x-auto">
          <p className="text-red mb-2 text-xs sm:text-sm">
            $ cat /var/log/error.log
          </p>
          <p className="text-gray text-xs sm:text-sm whitespace-nowrap">
            [ERROR] Resource '/requested/path' not found in filesystem
            <br />
            [WARNING] User navigation led to unmapped memory region
            <br />
            [INFO] Redirecting to safe state...
          </p>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-4 sm:px-6 py-3 bg-black border border-green text-green font-bold hover:bg-green hover:text-black transition-colors duration-200 mb-4 text-sm sm:text-base"
          >
            [ REBOOT SYSTEM ]
          </Link>

          <div className="text-gray text-xs sm:text-sm">
            <p>System will attempt automatic recovery...</p>
            <p className="mt-2">Type `ls /` to view available directories</p>
            <p>Type `help` for emergency commands</p>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray border-t border-gray pt-4">
          <p>Core dump saved to: /tmp/core.webpage.404</p>
          <p>Debug info: Contact system administrator</p>
        </div>
      </div>
    </div>
  );
}
