import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SeoCheck {
  name: string;
  status: 'success' | 'warning' | 'error';
  description: string;
  details: string;
}

const SeoAudit = () => {
  const [checks, setChecks] = useState<SeoCheck[]>([]);
  const [loading, setLoading] = useState(false);

  const runSeoChecks = async () => {
    setLoading(true);
    
    // Función para obtener el contenido del documento HTML actual
    const checkSeoElements = () => {
      const results: SeoCheck[] = [];
      
      // Revisar título
      const titleElement = document.querySelector('title');
      const titleContent = titleElement?.textContent || '';
      results.push({
        name: 'Etiqueta <title>',
        status: !titleElement ? 'error' : 
                titleContent.length < 30 ? 'warning' : 'success',
        description: !titleElement ? 'No se encontró la etiqueta de título' :
                   titleContent.length < 30 ? 'El título es demasiado corto' : 'El título tiene un buen tamaño',
        details: titleContent ? `"${titleContent}" (${titleContent.length} caracteres)` : 'Sin contenido'
      });
      
      // Revisar meta description
      const metaDesc = document.querySelector('meta[name="description"]');
      const metaDescContent = metaDesc?.getAttribute('content') || '';
      results.push({
        name: 'Meta descripción',
        status: !metaDesc ? 'error' :
                (metaDescContent.length < 50 || metaDescContent.length > 160) ? 'warning' : 'success',
        description: !metaDesc ? 'No se encontró la meta descripción' :
                   metaDescContent.length < 50 ? 'La meta descripción es demasiado corta' :
                   metaDescContent.length > 160 ? 'La meta descripción es demasiado larga' :
                   'La meta descripción tiene un buen tamaño',
        details: metaDescContent ? `"${metaDescContent}" (${metaDescContent.length} caracteres)` : 'Sin contenido'
      });
      
      // Revisar OG Image
      const ogImage = document.querySelector('meta[property="og:image"]');
      results.push({
        name: 'OG Image',
        status: !ogImage ? 'error' : 'success',
        description: !ogImage ? 'No se encontró la etiqueta og:image' : 'Se encontró la etiqueta og:image',
        details: ogImage?.getAttribute('content') || 'Sin contenido'
      });
      
      // Revisar Viewport
      const viewport = document.querySelector('meta[name="viewport"]');
      results.push({
        name: 'Viewport',
        status: !viewport ? 'error' : 'success',
        description: !viewport ? 'No se encontró la etiqueta viewport' : 'Se encontró la etiqueta viewport',
        details: viewport?.getAttribute('content') || 'Sin contenido'
      });
      
      return results;
    };
    
    const seoResults = checkSeoElements();
    setChecks(seoResults);
    setLoading(false);
  };

  useEffect(() => {
    runSeoChecks();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-6 w-6 text-amber-500" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Auditoría SEO</CardTitle>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={runSeoChecks} 
          disabled={loading}
          className="flex items-center gap-1"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Actualizar
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {checks.map((check, index) => (
            <div 
              key={index} 
              className={`p-4 border rounded-lg flex items-start gap-3 ${getStatusBg(check.status)}`}
            >
              <div className="flex-shrink-0 mt-0.5">
                {getStatusIcon(check.status)}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium">{check.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{check.description}</p>
                {check.details && (
                  <div className="text-xs bg-white/70 p-2 rounded border border-gray-100 overflow-hidden overflow-ellipsis">
                    {check.details}
                  </div>
                )}
              </div>
            </div>
          ))}

          {checks.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              {loading ? 'Analizando...' : 'No hay datos disponibles. Haga clic en "Actualizar" para ejecutar el análisis.'}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoAudit;