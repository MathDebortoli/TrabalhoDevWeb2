package trabalho.dev.web.model.domain;

import jakarta.persistence.*;
import java.util.Date;

@Entity(name="Dependente")
public class DependenteDomain extends ClienteDomain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "socio")  // Referência à chave estrangeira para Socio
    private SocioDomain socio;  // Relacionamento com o Socio

    public DependenteDomain() {
        super();
    }

    public DependenteDomain(String nome, char sexo, Date dataNascimento) {
        super(nome, sexo, dataNascimento);
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SocioDomain getSocio() {
        return socio;
    }

    public void setSocio(SocioDomain socio) {
        this.socio = socio;
    }
}
